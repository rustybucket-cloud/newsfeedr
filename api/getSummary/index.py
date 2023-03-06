from http.server import BaseHTTPRequestHandler
from os.path import dirname, abspath, join
import requests
from bs4 import BeautifulSoup
import os
import openai
import json
from urllib.parse import urlparse, unquote

dir = dirname(abspath(__file__))

class handler(BaseHTTPRequestHandler):

    def do_GET(self):

        o = urlparse(self.path)
        params_list = o.query.split('&')
        params = {}
        for param in params_list:
            key, value = param.split('=')
            params[key] = value
        
        try:
          summary = get_summary(params["url"])
          self.send_response(200)
          data = { "summary": summary }
        except Exception as e:
          print(e)
          self.send_response(500)
          data = { "error": str(e) }
        self.send_header('Content-type','text/plain')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
        return

def get_summary(url):
  req = requests.get(unquote(url))
  soup = BeautifulSoup(req.content, "html.parser")
  results = soup.find('article')

  if results is None:
    raise Exception("Nothing returned from article")

  openai.api_key = os.getenv("OPENAI_API_KEY")
  data = openai.Completion.create(
    model="text-davinci-003",
    prompt=f"Summarize this: {results.text}",
    max_tokens=100,
    temperature=0
  )
  return data["choices"][0]["text"]
