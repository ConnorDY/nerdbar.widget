command: "sh ./nerdbar.widget/scripts/screens"

refreshFrequency: 1000 # ms

render: (output) ->
  """
    <link rel="stylesheet" type="text/css" href="./nerdbar.widget/colors.css" />
    <div class='kwmmode'></div>
  """

style: """
  -webkit-font-smoothing: antialiased;
  left: 10px;
  top: 5px;
  width: 850px;
  overflow: hidden;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
"""

# To add new apps, just make a new if statement. For Font Awesome brand icons
# use 'bicon' as the span class, for regular icons use 'ricon', and
# solid icons use 'icon'
#
getAppIcon: (app) ->

    app = app.replace /^\s+/g, ""
    app = app.toLowerCase()

    # if app == 'firefox'
    #     return "<span class='bicon'>&nbsp</span>"
    # if app == 'spark'
    #     return "<span class='bicon'>&nbsp</span>"
    # if app == 'messages'
    #     return "<span class='icon'></span>"
    # if app == 'bear'
    #     return "<span class='icon'></span>"
    # if app == 'fantastical 2'
    #     return "<span class='icon'></span>"
    # if app == 'iterm2'
    #     return "<span class='icon'></span>"
    # if app == '1password'
    #     return "<span class='icon'></span>"
    # if app == 'finder'
    #     return "<span class='icon'></span>"
    # if app == 'transmission'
    #     return "<span class='icon'></span>"
    # if app == 'system preferences'
    #     return "<span class='icon'></span>"
    # if app == 'pcalc'
    #     return "<span class='icon'></span>"
    # if app == ''
    #     return "<span class='ricon'></span><span class='white'> …</span>"
    # if app == 'spotify'
    #     return "<span class='bicon'>&nbsp</span><span> spotify</span>"
    # else
    return "<span class='ricon'><!--&nbsp--></span><span>#{app}&nbsp</span>"

trimWindowName: (path) ->

    file = ""
    wins = path
    win = ""
    winseg = wins.split('/')
    file = winseg[winseg.length - 1]
    j = winseg.length - 1
    flag1 = 0
    flag2 = 0

    while file.length >=65
        file = file.slice(0, -1)
        flag1 = 1

    if j > 1
        while j >= 1
            j -= 1
            if (win + file).length >= 65
                win = ' …/' + win
                break
            else
                win = winseg[j] + '/' + win

    while win.length >=65
        win = win.slice(1)
        flag2 = 1

    if flag1 >= 1
        file = file + '…'

    if flag2 >= 1
        win = '…' + win

    if path == ""
        win = "<span class='white'>…</span>"

    return "<span>#{win}</span>" + "<span class='white'>#{file}</span>"



update: (output, domEl) ->

  values = output.split('@')

  file = ""
  screenhtml = ""
  mode = values[0].replace /^\s+|\s+$/g, ""
  active = parseInt(values[1])
  total = parseInt(values[2])
  activeWindow = values[3].split(',')
  app = activeWindow[0]
  title = activeWindow[1]

  #apply a proper number tag so that space change controls can be added

  for i in [1..total]
    if i == active
      screenhtml += "<span class='ricon screen#{i}'>&nbsp&nbsp</span>"
    else
      screenhtml += "<span class='ricon white screen#{i}'>&nbsp&nbsp</span>"

  #display the html string
  $(domEl).find('.kwmmode').html("<span class='tilingMode icon'></span>" +
                                 "<span class='tilingMode white'>[#{mode}]" +
                                 "<span class='cyan'> ⎢ </span></span>" +
                                 screenhtml +
                                 "<span>&nbsp</span>" +
                                 # "<span>&nbsp&nbsp&nbsp&nbsp&nbsp</span>" +
                                 @getAppIcon(app) +
                                 @trimWindowName(title))

  # add screen changing controls to the screen icons
  # $(".screen1").on 'click', => @run "osascript -e 'tell application \"System Events\" to key code 18 using control down'"
  # $(".screen2").on 'click', => @run "osascript -e 'tell application \"System Events\" to key code 19 using control down'"
  # $(".screen3").on 'click', => @run "osascript -e 'tell application \"System Events\" to key code 20 using control down'"
  # $(".screen4").on 'click', => @run "osascript -e 'tell application \"System Events\" to key code 21 using control down'"
