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
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        o = urlparse(self.path)
        params_list = o.query.split('&')
        params = {}
        for param in params_list:
            key, value = param.split('=')
            params[key] = value
        
        summary = get_summary(params["url"])
        self.wfile.write(json.dumps({ "summary": summary }).encode())
        return

def get_summary(url):
  req = requests.get(unquote(url))
  soup = BeautifulSoup(req.content, "html.parser")
  results = soup.find('article')

  openai.api_key = os.getenv("OPENAI_API_KEY")
  data = openai.Completion.create(
    model="text-davinci-003",
    prompt=f"Summarize this: {results.text}",
    max_tokens=50,
    temperature=0
  )
  return data["choices"][0]["text"]
