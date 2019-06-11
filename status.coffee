command: "sh ./nerdbar.widget/scripts/status.sh"

refreshFrequency: 10000 # ms

render: (output) ->
  """
    <link rel="stylesheet" type="text/css" href="./nerdbar.widget/colors.css" />
    <div class="compstatus"></div>
  """

style: """
  right: 76px
  top: 5px
  height: 13
  .wifi
    font: 14px FontAwesome
    top: 1px
    position: relative
    left: 10px
  .wifi.icon
    margin-right: 12px
  .charging
    font: 12px FontAwesome
    position: relative
    top: 0px
    left: 12px
    z-index: 1
    color: #ffffff
  .timeDate
    position: relative;
    margin-left: 5px;
  """
timeAndDate: (date, time) ->
  # returns a formatted html string with the date and time
  return "<span class='white timeDate'><span class='icon'>&nbsp</span>#{date}&nbsp<span class='icon'></span>#{time}</span></span>";

batteryStatus: (battery, state) ->
  #returns a formatted html string current battery percentage, a representative icon and adds a lighting bolt if the
  # battery is plugged in and charging
  batnum = parseInt(battery)
  if state == 'AC' and batnum >= 90
    return "<span class='charging sicon'></span><span class='green icon '></span><span class='white'>#{batnum}%</span>"
  else if state == 'AC' and batnum >= 50 and batnum < 90
    return "<span class='charging icon'></span><span class='green icon'></span><span class='white'>#{batnum}%</span>"
  else if state == 'AC' and batnum < 50 and batnum >= 15
    return "<span class='charging icon'></span><span class='yellow icon'></span><span class='white'>#{batnum}%</span>"
  else if state == 'AC' and batnum < 15
    return "<span class='charging icon'></span><span class='red icon'></span><span class='white'>#{batnum}%</span>"
  else if batnum >= 90
    return "<span class='green icon'>&nbsp</span><span class='white'>#{batnum}%</span>"
  else if batnum >= 50 and batnum < 90
    return "<span class='green icon'>&nbsp</span><span class='white'>#{batnum}%</span>"
  else if batnum < 50 and batnum >= 25
    return "<span class='yellow icon'>&nbsp</span><span class='white'>#{batnum}%</span>"
  else if batnum < 25 and batnum >= 15
    return "<span class='yellow icon'>&nbsp</span><span class='white'>#{batnum}%</span>"
  else if batnum < 15
    return "<span class='red icon'>&nbsp</span><span class='white'>#{batnum}%</span>"

getWifiStatus: (status, netName, netIP) ->
  if status == "Wi-Fi"
    return "<span class='wifi icon'>&nbsp&nbsp</span><span class='white'>#{netName}</span>"
  if status == 'USB 10/100/1000 LAN' or status == 'Apple USB Ethernet Adapter'
    return "<span class='wifi icon'>&nbsp&nbsp</span><span class='white'>#{netIP}</span>"
  else
    return "<span class='grey wifi icon'>&nbsp&nbsp</span><span class='white'>---</span>"

getMailCount: (count) ->
  return "<span class='icon'></span><span class=white>#{count}</span>"

getReminders: (reminders) ->
  return "<span class='reminders'><span class='icon'></span></span><span class='white'>#{reminders}&nbsp</span>"
  

update: (output, domEl) ->

  # split the output of the script
  values = output.split('@')

  time = values[0].replace /^\s+|\s+$/g, ""
  date = values[1]
  battery = values[2]
  isCharging = values[3]
  netStatus = values[4].replace /^\s+|\s+$/g, ""
  netName = values[5]
  netIP = values[6]
  mail = values[7]
  reminders = values[8].replace /^\s+|\s+$/g, ""

  # create an HTML string to be displayed by the widget
  htmlString = @getWifiStatus(netStatus, netName, netIP) + "<span class='cyan'>" + " ⎢" + "</span>" +
               @batteryStatus(battery, isCharging) + "<span class='cyan'>" + " ⎢ " + "</span>" +
               # @getMailCount(mail) + "&nbsp&nbsp" +
               @getReminders(reminders) + "<span class='cyan'>⎢</span>" +
               @timeAndDate(date,time) + "<span class ='cyan'> ⎢  </span>"

  $(domEl).find('.compstatus').html(htmlString)
