

browser 		= firefox
command_args 	= #-jsconsole 

target_page		= MainPage.html 

all:
	$(browser) $(target_page) $(command_args) &