#!/usr/bin/bash

echo $(sh ./nerdbar.widget/scripts/time_script)@$(sh ./nerdbar.widget/scripts/date_script)@$(sh ./nerdbar.widget/scripts/battery_percentage_script)%@$(sh ./nerdbar.widget/scripts/battery_charging_script)@$(sh ./nerdbar.widget/scripts/wifi_status_script)@$(/usr/local/bin/python3 ./nerdbar.widget/scripts/mail.py)@$(sh ./nerdbar.widget/scripts/reminders.sh)

