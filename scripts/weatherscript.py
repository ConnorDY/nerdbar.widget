#! /usr/bin/python3

import os
import json
import urllib.request
import socket
from socket import AF_INET, SOCK_STREAM, timeout
from urllib.error import URLError, HTTPError

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
            loc_json = "http://ip-api.com/json"
            loc_result = urllib.request.urlopen(loc_json).read()
            loc_data = json.loads(loc_result.decode())
            latitude = str(loc_data['lat'])
            longitude = str(loc_data['lon'])
            city = loc_data['city']
            region = loc_data['region']
            country = loc_data['country']
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
            weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ latitude + '&lon=' + longitude + '&appid=' + os.environ['OPENWEATHERMAP_API_KEY']
            result = urllib.request.urlopen(weatherURL).read()
            data = json.loads(result.decode())

            print(k2f(data['list'][0]['main']['temp']) + '@' +
                  data['list'][0]['weather'][0]['main'])

            # weather = Weather(unit=Unit.CELSIUS)
            # lookup = weather.lookup(city + ', ' + region)
            # data = []
            # result = urllib.request.urlopen(yql_url).read()
            # data = json.loads(result.decode())
            # if data['query']['results']['channel']['item']['forecast'][4]['day'] != None:
            #     print(data['query']['results']['channel']['item']['condition']['temp'] + '@' +
            #           data['query']['results']['channel']['item']['condition']['code'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][0]['low'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][0]['high'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][0]['code'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][0]['day'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][1]['low'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][1]['high'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][1]['code'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][1]['day'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][2]['low'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][2]['high'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][2]['code'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][2]['day'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][3]['low'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][3]['high'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][3]['code'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][3]['day'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][4]['low'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][4]['high'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][4]['code'] + '@' +
            #           data['query']['results']['channel']['item']['forecast'][4]['day'] + '@' +
            #           city + '@' + region)
            # else:
            #    print("--@99")
            return
        # except URLError:
        #     print("--@99@Weather URLError")
        #     return
        # except HTTPError:
        #     print("--@99@Weather HTTPError")
        #     return
        # except TypeError:
        #     print("--@99@Weather TypeError")
        #     return
        except timeout:
            print("--@99@Weather timeout")
            return
        else:
            return
    else:
        print("--@99")


main()
