#!/usr/bin/python3

from AppKit import NSWorkspace
activeAppName = NSWorkspace.sharedWorkspace().activeApplication()[
    'NSApplicationName']
print(activeAppName)
