#!/bin/env python3

import requests
import json
import os


def get_fonts_raw(api_key):
    """
    get fonts list from Google Fonts API
    :param api_key: Google Fonts API key
    :return: fonts list
    """
    url = "https://www.googleapis.com/webfonts/v1/webfonts?" + f"key={api_key}" + '&' + f'sort=popularity'
    response = requests.get(url)
    return response.json()


def clean_fonts(fonts_raw):
    """
    clean fonts list
    :param fonts_raw: fonts list
    :return: list of fonts
    """
    fonts = []
    for font in fonts_raw['items']:
        fonts.append(font['family'])
    return fonts


def save_fonts(fonts_list, file_path):
    """
    save fonts list to json file
    :param fonts_list: list of fonts
    :param file_path: path to save file
    :return: None
    """
    with open(file_path, 'w') as f:
        json.dump(fonts_list, f)


# get API key from environment variable API_KEY
API_KEY = os.environ['API_KEY']
FILE_PATH = 'fonts.json'

# save fonts in json
save_fonts(clean_fonts(get_fonts_raw(API_KEY)), 'fonts.json')
