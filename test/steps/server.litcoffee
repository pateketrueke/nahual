
Given loaded "$SRC".

    (src) ->
      @browser
        .url('http://localhost:' + process.env.NW_PORT + src)
        .waitForElementVisible('body', 1000)
        .pause(3000)

Then "$EL" should contain "$TEXT".

    (el, text) ->
      @browser
        .expect.element(el).text.to.contain(text)