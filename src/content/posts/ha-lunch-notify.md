---
title: "【居家辦公】午餐吃什麼的自動化通知"
date: 2022-11-18 17:22:05
category: "🏠 智慧家庭"
tags:
  - "居家辦公"
  - "Home Assistant"
cover: "/images/covers/ha-lunch-notify.webp"
description: "一個會自動通知你午餐要吃什麼的小功能。 自從開始居家工作之後，更注重於時間管理，準時的上下班、午餐時間，固定的**儀式感，**才不會模糊掉**工作與生活的界線**。 然而除了自己的儀式感之外，也在自家的 HomeAssistant 上簡單的拉了一個自動提醒午餐的功能，減少自己每天花在「想午餐」這件事情上的時間。"
---

一個會自動通知你午餐要吃什麼的小功能。

自從開始居家工作之後，更注重於時間管理，準時的上下班、午餐時間，固定的**儀式感，**才不會模糊掉**工作與生活的界線**。

然而除了自己的儀式感之外，也在自家的 HomeAssistant 上簡單的拉了一個自動提醒午餐的功能，減少自己每天花在「想午餐」這件事情上的時間。
## 發想

每次午餐都不知道吃什麼，都要花時間想，原先只是想說有個簡單的工具可以每次亂數抽一下午餐要吃什麼，上網找了幾個工具，可以使用沒錯，但是好像還是不那麼理想。

後來就想到，不就是簡單的亂數，乾脆直接在 HA 拉一個功能，還可以自動化幾個規則：

- 固定 12 點鐘觸發
- 判斷是否為上班日
- 發送抽午餐通知，順便提醒午餐時間到了

> 判斷是否為上班日：這是我另一個根據行事曆唯依據的判斷邏輯，簡單的可以用是否為平日判斷即可
>

## 設定流程

在 packages 資料夾底下，創建一個 `random_lunkch.yaml`

```yaml
input_select:
  my_lunch:
    name: 午餐
    icon: mdi:food
    options:
      - 鍋貼

input_text:
  new_lunch:
    name: 新增午餐文字
    icon: mdi:food
  today_lunch:
    name: 今日午餐文字
  lunch_options_temp:
    name: 午餐選項暫存

input_button:
  new_lunch:
    name: 新增午餐
    icon: mdi:playlist-plus
  remove_lunch:
    name: 移除午餐
    icon: mdi:playlist-minus
  get_lunch:
    name: 抽午餐
    icon: mdi:bullseye-arrow
```

然後在 NodeRed 上拉個流程

> ```json
> [{"id":"8248c2f95714d25a","type":"server-state-changed","z":"64a9473eb44f7864","name":"新增午餐","server":"e6c3e1a5.acb55","version":4,"exposeToHomeAssistant":false,"haConfig":[{"property":"name","value":""},{"property":"icon","value":""}],"entityidfilter":"input_button.new_lunch","entityidfiltertype":"exact","outputinitially":false,"state_type":"str","haltifstate":"","halt_if_type":"str","halt_if_compare":"is","outputs":1,"output_only_on_state_change":true,"for":"0","forType":"num","forUnits":"minutes","ignorePrevStateNull":false,"ignorePrevStateUnknown":false,"ignorePrevStateUnavailable":false,"ignoreCurrentStateUnknown":false,"ignoreCurrentStateUnavailable":false,"outputProperties":[{"property":"payload","propertyType":"msg","value":"","valueType":"entityState"},{"property":"data","propertyType":"msg","value":"","valueType":"eventData"},{"property":"topic","propertyType":"msg","value":"","valueType":"triggerId"}],"x":140,"y":180,"wires":[["fbf4d4e147736104"]]},{"id":"123abf5769aeead2","type":"api-call-service","z":"64a9473eb44f7864","name":"新增午餐選項","server":"e6c3e1a5.acb55","version":5,"debugenabled":false,"domain":"input_select","service":"set_options","areaId":[],"deviceId":[],"entityId":["input_select.my_lunch"],"data":"payload","dataType":"jsonata","mergeContext":"","mustacheAltTags":true,"outputProperties":[],"queue":"none","x":500,"y":140,"wires":[["56c93a49b987bb42"]]},{"id":"fbf4d4e147736104","type":"function","z":"64a9473eb44f7864","name":"新午餐選項","func":"const ha = global.get('homeassistant').homeAssistant;\n\n// 取得資料\nlet newOption = ha.states['input_text.new_lunch'].state;\nlet options = ha.states['input_select.my_lunch'].attributes.options;\n\n// 新選項為空 或是 已經在選項內\nif (!newOption || options.includes(newOption)) {\n    return [null, msg];\n}\n\n// 加入到選項中\nlet newOptions = [...options, newOption];\n\n// 設定 msg\nmsg.payload = {\n    \"options\": newOptions\n};\n\nreturn [msg, null];","outputs":2,"noerr":0,"initialize":"","finalize":"","libs":[],"x":310,"y":180,"wires":[["123abf5769aeead2","2e38fb4c7b4e8e61"],["56c93a49b987bb42"]]},{"id":"56c93a49b987bb42","type":"api-call-service","z":"64a9473eb44f7864","name":"清除文字","server":"e6c3e1a5.acb55","version":5,"debugenabled":false,"domain":"input_text","service":"set_value","areaId":[],"deviceId":[],"entityId":["input_text.new_lunch"],"data":"{\"value\":\"\"}","dataType":"jsonata","mergeContext":"","mustacheAltTags":false,"outputProperties":[],"queue":"none","x":680,"y":180,"wires":[[]]},{"id":"21a9c2ae23f0fab0","type":"server-state-changed","z":"64a9473eb44f7864","name":"移除午餐","server":"e6c3e1a5.acb55","version":4,"exposeToHomeAssistant":false,"haConfig":[{"property":"name","value":""},{"property":"icon","value":""}],"entityidfilter":"input_button.remove_lunch","entityidfiltertype":"exact","outputinitially":false,"state_type":"str","haltifstate":"","halt_if_type":"str","halt_if_compare":"is","outputs":1,"output_only_on_state_change":true,"for":"0","forType":"num","forUnits":"minutes","ignorePrevStateNull":false,"ignorePrevStateUnknown":false,"ignorePrevStateUnavailable":false,"ignoreCurrentStateUnknown":false,"ignoreCurrentStateUnavailable":false,"outputProperties":[{"property":"payload","propertyType":"msg","value":"","valueType":"entityState"},{"property":"data","propertyType":"msg","value":"","valueType":"eventData"},{"property":"topic","propertyType":"msg","value":"","valueType":"triggerId"}],"x":140,"y":300,"wires":[["33cac9de44ec1ce8"]]},{"id":"33cac9de44ec1ce8","type":"function","z":"64a9473eb44f7864","name":"新午餐選項","func":"const ha = global.get('homeassistant').homeAssistant;\n\n// helpers functions\nlet arrRemove = (arr, value) => arr.filter((ele) => ele != value);\n\n// 取得資料\nlet currentOption = ha.states['input_select.my_lunch'].state;\nlet options = ha.states['input_select.my_lunch'].attributes.options;\n\n// 複製選項，避免改到原本資料\nlet newOptions = [...options];\n\n// 刪除後要選擇下一個選項\nlet nextOptionIdx = newOptions.indexOf(currentOption) + 1;\nlet nextOption = null;\nif (nextOptionIdx < newOptions.length) {\n    nextOption = newOptions[nextOptionIdx]\n}\n\n// 刪除選項\nnewOptions = arrRemove(newOptions, currentOption);\n\n// 設定 msg\nmsg.payload = {\n    \"options\": newOptions\n};\nmsg.nextOption = nextOption;\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":310,"y":300,"wires":[["38184ea529abe72b","2e38fb4c7b4e8e61"]]},{"id":"38184ea529abe72b","type":"api-call-service","z":"64a9473eb44f7864","name":"新增午餐選項","server":"e6c3e1a5.acb55","version":5,"debugenabled":false,"domain":"input_select","service":"set_options","areaId":[],"deviceId":[],"entityId":["input_select.my_lunch"],"data":"payload","dataType":"jsonata","mergeContext":"","mustacheAltTags":true,"outputProperties":[{"property":"nextOption","propertyType":"msg","value":"nextOption","valueType":"msg"}],"queue":"none","x":500,"y":300,"wires":[["a125dce5821db944"]]},{"id":"a001cfe9e0764ffc","type":"function","z":"64a9473eb44f7864","name":"抽籤","func":"const ha = global.get('homeassistant').homeAssistant;\n\nlet options = [...ha.states['input_select.my_lunch'].attributes.options];\n\n// helpers functions\nlet arrRemove = (arr, value) => arr.filter((ele) => ele != value);\nlet getRandomInt = (min, max) => {\n    min = Math.ceil(min);\n    max = Math.floor(max);\n    return Math.floor(Math.random() * (max - min + 1) + min);\n};\nlet getRandomOption = () => {\n    if (!options.length) {\n        return null;\n    }\n    let randOption = options[getRandomInt(0, options.length -1)];\n    options = arrRemove(options, randOption);\n    return randOption;\n};\n\n// get options\nmsg.payload = [\n    getRandomOption(),\n    getRandomOption()\n]\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":670,"y":440,"wires":[["a35fcec7caecaf8d"]]},{"id":"a35fcec7caecaf8d","type":"template","z":"64a9473eb44f7864","name":"文字","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"今天午餐吃 {{payload.0}}，或是 {{payload.1}}","output":"str","x":810,"y":440,"wires":[["97935d0e9c5aad56","5b22215072849558"]]},{"id":"5b22215072849558","type":"api-call-service","z":"64a9473eb44f7864","name":"手機通知","server":"e6c3e1a5.acb55","version":5,"debugenabled":false,"domain":"notify","service":"mobile_app_longiphone","areaId":[],"deviceId":[],"entityId":[],"data":"{\"title\": \"今日午餐\",\"message\":\"{{payload}}\"}","dataType":"json","mergeContext":"","mustacheAltTags":false,"outputProperties":[],"queue":"none","x":960,"y":440,"wires":[[]]},{"id":"97935d0e9c5aad56","type":"api-call-service","z":"64a9473eb44f7864","name":"儲存文字","server":"e6c3e1a5.acb55","version":5,"debugenabled":false,"domain":"input_text","service":"set_value","areaId":[],"deviceId":[],"entityId":["input_text.today_lunch"],"data":"{\"value\":\"{{payload}}\"}","dataType":"json","mergeContext":"","mustacheAltTags":false,"outputProperties":[],"queue":"none","x":960,"y":500,"wires":[[]]},{"id":"df86347c9a1e2308","type":"inject","z":"64a9473eb44f7864","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"00 12 * * *","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":160,"y":440,"wires":[["9c45aebc1d29e211"]]},{"id":"6765a3d308380d08","type":"server-state-changed","z":"64a9473eb44f7864","name":"手動抽午餐","server":"e6c3e1a5.acb55","version":4,"exposeToHomeAssistant":false,"haConfig":[{"property":"name","value":""},{"property":"icon","value":""}],"entityidfilter":"input_button.get_lunch","entityidfiltertype":"exact","outputinitially":false,"state_type":"str","haltifstate":"","halt_if_type":"str","halt_if_compare":"is","outputs":1,"output_only_on_state_change":true,"for":"0","forType":"num","forUnits":"minutes","ignorePrevStateNull":false,"ignorePrevStateUnknown":false,"ignorePrevStateUnavailable":false,"ignoreCurrentStateUnknown":false,"ignoreCurrentStateUnavailable":false,"outputProperties":[{"property":"payload","propertyType":"msg","value":"","valueType":"entityState"},{"property":"data","propertyType":"msg","value":"","valueType":"eventData"},{"property":"topic","propertyType":"msg","value":"","valueType":"triggerId"}],"x":480,"y":520,"wires":[["a001cfe9e0764ffc"]]},{"id":"9c45aebc1d29e211","type":"api-current-state","z":"64a9473eb44f7864","name":"為上班日","server":"e6c3e1a5.acb55","version":3,"outputs":2,"halt_if":"True","halt_if_type":"str","halt_if_compare":"is","entity_id":"sensor.workday","state_type":"str","blockInputOverrides":false,"outputProperties":[{"property":"payload","propertyType":"msg","value":"","valueType":"entityState"},{"property":"data","propertyType":"msg","value":"","valueType":"entity"}],"for":0,"forType":"num","forUnits":"minutes","x":300,"y":440,"wires":[["d4ebf9ce07268bfe"],[]]},{"id":"d4ebf9ce07268bfe","type":"api-current-state","z":"64a9473eb44f7864","name":"在家?","server":"e6c3e1a5.acb55","version":3,"outputs":2,"halt_if":"home","halt_if_type":"str","halt_if_compare":"is","entity_id":"person.long","state_type":"str","blockInputOverrides":false,"outputProperties":[{"property":"data","propertyType":"msg","value":"","valueType":"entity"}],"for":0,"forType":"num","forUnits":"minutes","x":450,"y":440,"wires":[["a001cfe9e0764ffc"],[]]},{"id":"a125dce5821db944","type":"api-call-service","z":"64a9473eb44f7864","name":"設定午餐選項為下一個","server":"e6c3e1a5.acb55","version":5,"debugenabled":false,"domain":"input_select","service":"select_option","areaId":[],"deviceId":[],"entityId":["input_select.my_lunch"],"data":"{\"option\":\"{{nextOption}}\"}","dataType":"json","mergeContext":"","mustacheAltTags":false,"outputProperties":[],"queue":"none","x":720,"y":300,"wires":[[]]},{"id":"200c42378c8756f3","type":"api-call-service","z":"64a9473eb44f7864","name":"重置午餐選項","server":"e6c3e1a5.acb55","version":5,"debugenabled":false,"domain":"input_select","service":"set_options","areaId":[],"deviceId":[],"entityId":["input_select.my_lunch"],"data":"payload","dataType":"jsonata","mergeContext":"","mustacheAltTags":true,"outputProperties":[{"property":"nextOption","propertyType":"msg","value":"nextOption","valueType":"msg"}],"queue":"none","x":640,"y":660,"wires":[[]]},{"id":"6a795a0d9e9b5171","type":"function","z":"64a9473eb44f7864","name":"抓取暫存午餐選項","func":"const ha = global.get('homeassistant').homeAssistant;\n\n\n// 取得資料\nlet options = ha.states['input_text.lunch_options_temp'].state;\n\n// 設定 msg\nmsg.payload = {\n    \"options\": options.split(','),\n};\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":430,"y":660,"wires":[["200c42378c8756f3"]]},{"id":"2e38fb4c7b4e8e61","type":"function","z":"64a9473eb44f7864","name":"暫存選項","func":"msg.payload = {\n    \"value\": msg.payload.options.join(',')\n}\nreturn msg","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":480,"y":240,"wires":[["92da02e3390b285e"]]},{"id":"92da02e3390b285e","type":"api-call-service","z":"64a9473eb44f7864","name":"暫存選項","server":"e6c3e1a5.acb55","version":5,"debugenabled":false,"domain":"input_text","service":"set_value","areaId":[],"deviceId":[],"entityId":["input_text.lunch_options_temp"],"data":"payload","dataType":"jsonata","mergeContext":"","mustacheAltTags":false,"outputProperties":[],"queue":"none","x":640,"y":240,"wires":[[]]},{"id":"fb8fdd1a7bbdeb3d","type":"link in","z":"64a9473eb44f7864","name":"Home Assistant Restarted","links":["3754cbf709193071"],"x":190,"y":660,"wires":[["6a795a0d9e9b5171"]],"l":true},{"id":"e6c3e1a5.acb55","type":"server","name":"Home Assistant","version":4,"addon":true,"rejectUnauthorizedCerts":true,"ha_boolean":"y|yes|true|on|home|open","connectionDelay":true,"cacheJson":true,"heartbeat":false,"heartbeatInterval":30,"areaSelector":"friendlyName","deviceSelector":"friendlyName","entitySelector":"friendlyName","statusSeparator":"at: ","statusYear":"hidden","statusMonth":"short","statusDay":"numeric","statusHourCycle":"h23","statusTimeFormat":"h:m"}]
> ```


![](/images/posts/ha-lunch-notify/nodered.png)

由於 HA 再重新啟動後，input_select 的選項會被重置，所以圖片中最下面那個是需要搭配 [Starting a flow after a Home Assistant restart](https://zachowj.github.io/node-red-contrib-home-assistant-websocket/cookbook/starting-flow-after-home-assistant-restart.html) 把暫存的選項抓回來。

之後再把那些元件放在 HA 的總覽上，就可以在這邊新增/刪除選項，或是手動觸發。

![](/images/posts/ha-lunch-notify/ui.png)

## 結論

![](/images/posts/ha-lunch-notify/notification.png)

之後每天就會有固定收到通知，提醒你午餐時間，並幫你想好午餐可以吃什麼。

這是第一次完整在 HA 上弄不是串接硬體裝置的功能，還蠻有趣的，透過這個功能每天省下的時間，可以拿去做更多想做的事情～

## 參考

- [Starting a flow after a Home Assistant restart](https://zachowj.github.io/node-red-contrib-home-assistant-websocket/cookbook/starting-flow-after-home-assistant-restart.html)
