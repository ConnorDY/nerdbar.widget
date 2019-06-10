command: "sh ./nerdbar.widget/scripts/screens2"

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

update: (output, domEl) ->

  values = output.split('@')

  file = ""
  screenhtml = ""
  active = parseInt(values[0])
  all = values[1].split(' ')
  start = parseInt(all[0])
  total = all.length

  #apply a proper number tag so that space change controls can be added

  for i in [1..total]
    if i + start - 1 == active
      screenhtml += "<span class='ricon screen#{i}'>&nbsp&nbsp</span>"
    else
      screenhtml += "<span class='ricon white screen#{i}'>&nbsp&nbsp</span>"

  #display the html string
  $(domEl).find('.kwmmode').html(screenhtml)
                                 