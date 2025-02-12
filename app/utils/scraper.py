import requests
import trafilatura
from bs4 import BeautifulSoup
import json
from datetime import datetime
import time
from log_config import setup_logging
import sys

# Initialize logging
logger = setup_logging()

class YeTweetsScraper:
    def __init__(self):
        self.base_url = "https://yetweets.xyz/archive"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',  # Explicitly support Brotli
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Cache-Control': 'max-age=0'
        }
        self.posts = []

    def fetch_page(self, url):
        """Fetch webpage content with error handling and retries"""
        max_retries = 3
        for attempt in range(max_retries):
            try:
                response = requests.get(url, headers=self.headers)
                response.raise_for_status()

                # Log response headers and status
                logger.info(f"Response Status Code: {response.status_code}")
                logger.info(f"Response Headers: {dict(response.headers)}")

                # Log the first part of the content to see what we're getting
                content_preview = response.text[:1000].replace('\n', ' ')
                logger.info(f"Content Preview: {content_preview}")

                return response.text
            except requests.RequestException as e:
                logger.error(f"Attempt {attempt + 1}/{max_retries} failed: {str(e)}")
                if attempt == max_retries - 1:
                    raise
                time.sleep(2 ** attempt)  # Exponential backoff

    def parse_post(self, post_element):
        """Extract data from a single post element"""
        try:
            post_data = {
                'text': None,
                'date': None,
                'likes': 0,
                'retweets': 0,
                'replies': 0
            }

            # Log the HTML structure we're trying to parse
            logger.info(f"Parsing element: {str(post_element)[:200]}")

            # Extract text content
            text_content = post_element.get_text(strip=True)
            if text_content:
                post_data['text'] = text_content
                logger.info(f"Found text content: {text_content[:100]}...")
                return post_data

            return None
        except Exception as e:
            logger.error(f"Error parsing post: {str(e)}")
            return None

    def scrape_posts(self):
        """Main scraping function"""
        try:
            logger.info("Starting scraping process...")

            # Fetch the archive page
            html_content = self.fetch_page(self.base_url)
            if not html_content:
                logger.error("Failed to fetch page content")
                return False

            # Try Trafilatura first as it's good at extracting main content
            downloaded = trafilatura.fetch_url(self.base_url)
            if downloaded:
                extracted_text = trafilatura.extract(downloaded)
                if extracted_text:
                    logger.info("Successfully extracted content using Trafilatura")
                    # Split the content into potential posts
                    lines = [line.strip() for line in extracted_text.split('\n') if line.strip()]
                    for line in lines:
                        if len(line) > 50:  # Only consider substantial text blocks
                            self.posts.append({
                                'text': line,
                                'date': None,
                                'likes': 0,
                                'retweets': 0,
                                'replies': 0
                            })
                    logger.info(f"Extracted {len(self.posts)} posts using Trafilatura")
                    return True

            # Fallback to BeautifulSoup if Trafilatura didn't work
            soup = BeautifulSoup(html_content, 'html.parser')
            logger.info("Created BeautifulSoup object")

            # Find all post elements using the specific class
            post_elements = soup.find_all('div', class_='text-xl font-semibold leading-relaxed')
            logger.info(f"Found {len(post_elements)} posts with target class")

            for post_element in post_elements:
                post_data = self.parse_post(post_element)
                if post_data:
                    self.posts.append(post_data)

            if not self.posts:
                # If no posts found with the specific class, try a more general approach
                logger.info("No posts found with target class, trying alternative selectors")
                text_blocks = soup.find_all(['div', 'p'], text=True)
                for block in text_blocks:
                    text = block.get_text(strip=True)
                    if len(text) > 50:  # Only consider substantial text blocks
                        self.posts.append({
                            'text': text,
                            'date': None,
                            'likes': 0,
                            'retweets': 0,
                            'replies': 0
                        })

            logger.info(f"Extracted {len(self.posts)} potential posts")
            return True

        except Exception as e:
            logger.error(f"Scraping failed: {str(e)}")
            logger.exception(e)  # Log full traceback
            return False

    def save_to_json(self, filename="yetweets.json"):
        """Save scraped posts to JSON file"""
        try:
            output_data = {
                "metadata": {
                    "scraped_at": datetime.now().isoformat(),
                    "total_posts": len(self.posts),
                    "source_url": self.base_url
                },
                "posts": self.posts
            }

            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(output_data, f, ensure_ascii=False, indent=2)

            logger.info(f"Successfully saved {len(self.posts)} posts to {filename}")
            return True
        except Exception as e:
            logger.error(f"Error saving to JSON: {str(e)}")
            return False

def main():
    scraper = YeTweetsScraper()

    try:
        if scraper.scrape_posts():
            scraper.save_to_json()
            logger.info("Scraping completed successfully")
            return 0
        else:
            logger.error("Scraping failed")
            return 1
    except KeyboardInterrupt:
        logger.info("Scraping interrupted by user")
        return 1
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())