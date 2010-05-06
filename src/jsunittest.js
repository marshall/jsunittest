<%= include 'HEADER' %>

<%= include 'common.js' %>

JsUnitTest.Version = '<%= APP_VERSION %>';

<%= include 'prototype/template.js', 'prototype/event.js' %>

<%= include 'logger.js', 'message_template.js', 'ajax.js' %>
<%= include 'assertions.js' %>
<%= include 'runner.js', 'test_case.js' %>

var Test = JsUnitTest;