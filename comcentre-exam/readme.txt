I don't have experience of runn PHP script via GUI and Commandline, I do research and i decided to try using commandline. Running this system can be done via Commandline and as a Website.

TEST PLAN:

NOTE: Make sure that PHP is running.

VIA WEB
1. Visit "comcentre-exam" on browser where the localhost project folder is located. ex(http://localhost/comcentre-exam)
2. Input value change - Red border will remove if has.
3. Input value without comma - upon leave or focusout on textbox, the value will change in this format "x,xxx" if x is greater than 999 and "xxx" if less than 1000.
4. Submit
   3.1 With no value - An alert box will popup saying "Input Amount is required!" then change the textbox border to red.
   3.2 With value - Result will show in a word format.

VIA COMMANDLINE
1. open cmd and go to comcentre-exam project folder. ex:C:\server\www\comcentre-exam
2. type "php compute.php" then enter. the result should be "AMOUNT IS REQUIRED!"
3. type "php compute.php 123.45" then enter. the result should be "ONE HUNDRED AND TWENTY-THREE DOLLARS AND FORTY-FIVE CENTS". (you can change "123.45" in any amount)
4. if the amount has a characters except on numbers, dot and comma, the result should be "INVALID AMOUNT!"


For Web approach you need a open source web server ex: XAMPP, NGINX etc.
For CMD or Commandline just do the Test Plan above for CMD.