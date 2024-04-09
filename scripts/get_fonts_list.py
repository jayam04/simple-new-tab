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
        json.dump(fonts_list, f, indent=4)


def get_api_key():
    """
    get API key from file
    :return: API key
    """
    if 'API_KEY' in os.environ:
        return os.environ['API_KEY']
    with open("private/google_fonts_aou_key.txt") as f:
        return f.read()
    

def main():
    API_KEY = get_api_key()
    FILE_PATH = 'data/fontsv2.json'

    # get existing fonts from json
    with open(FILE_PATH) as file:
        existing_fonts = json.load(file)

    # get new fonts
    new_fonts = clean_fonts(get_fonts_raw(API_KEY))

    if sorted(existing_fonts) == sorted(new_fonts):
        print("No new fonts found")
        exit()

    # save fonts in json
    save_fonts(new_fonts, FILE_PATH)


if __name__ == '__main__':
    main()
