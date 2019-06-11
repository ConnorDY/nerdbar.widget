#! /usr/bin/python3

import os
import json
import urllib.request
import socket
from socket import AF_INET, SOCK_STREAM, timeout
from urllib.error import URLError, HTTPError

overrideLat = 32.78
overrideLon = -79.93


def k2f(kelvin):
    return str(round((kelvin - 273.15) * 9/5 + 32))


def check_connectivity(host="8.8.8.8", port=53, timeout=10):
    """
    Host: 8.8.8.8 (google-public-dns-a.google.com)
    OpenPort: 53/tcp
    Service: domain (DNS/TCP)
    """
    try:
        socket.setdefaulttimeout(timeout)
        socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect((host, port))
        return True
    except socket.timeout:
        return False
    except socket.error:
        return False
    else:
        return False


def main():
    if check_connectivity() == True:
        try:
            try:
                overrideLat
                overrideLon
            except NameError:
                loc_json = "http://ip-api.com/json"
                loc_result = urllib.request.urlopen(loc_json).read()
                loc_data = json.loads(loc_result.decode())
                latitude = str(loc_data['lat'])
                longitude = str(loc_data['lon'])
                city = loc_data['city']
                region = loc_data['region']
                country = loc_data['country']
            else:
                latitude = str(overrideLat)
                longitude = str(overrideLon)
        except URLError:
            print("--@99@IP URLError")
            return
        except HTTPError:
            print("--@99@IP HTTPError")
            return
        except TypeError:
            print("--@99@IP TypeError")
            return
        except timeout:
            print("--@99@IP timeout")
            return
        except:
            print("--@99@IP err")
            return

        try:
            weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + \
                '&lon=' + longitude + '&appid=' + \
                os.environ['OPENWEATHERMAP_API_KEY']
            result = urllib.request.urlopen(weatherURL).read()
            data = json.loads(result.decode())

            print(k2f(data['list'][0]['main']['temp']) + '@' +
                  str(data['list'][0]['weather'][0]['id']))
            return
        else:
            print("--@99@Weather error")
            return
    else:
        print("--@99")


main()
