/******************  VARIÁVEIS  ***************/
const url = "https://login.microsoftonline.com/be87ed09-e753-468f-8244-e2f3811ceacc/oauth2/v2.0/token";
const emailUser = $("#formUser");
const senhaUser = $("#formPassword");

/******************  EVENTOS  ***************/
$("#btnLogin").click(function() {
	try {
		if(validaCampos()){
			console.log(emailUser.val() + " - " + senhaUser.val());
			$.ajax({
				"url" : url,
				"async": true,
				"crossDomain": true,
				"headers": {
						'Content-Type': 'application/x-www-form-urlencoded',
						'SdkVersion': 'postman-graph/v1.0'            
				},
				"type" : 'POST',
				"data" : {
						'grant_type': 'password',
						'client_id': '682aac27-6b4b-4f13-a4f9-21f8b0f30f08',
						'client_secret': '.C=T8S7[XpPu0qY-HTPcUgVObr4=bHUF',
						'scope': 'https://graph.microsoft.com/.default',
						'userName' : emailUser.val(),
						'password' : senhaUser.val()
				},
				"dataType": 'json',
				beforeSend : function(){
					mensagem("alert-primary","Logando...");
				},
				error: function(errorMsg) {
					mensagem("alert-danger","Usuário e/ou Senha inválido(s)!!!");
				},
				success: function (response) {
					mensagem("alert-success","Login realizado com sucesso!");  
				}
			}).fail(function(jqXHR, textStatus, msg){
				mensagem("alert-warning","Falha ao executar login");	
			});
		}
	} catch (error) {
		console.log("Click do btnLogin: " + error);
	}	
});

$(".toggle-password").click(function() {
	try {
		$(this).toggleClass("fa-eye fa-eye-slash");
		var input = $($(this).attr("toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	} catch (error) {
		console.log("Click do toggle-password: " + error);
	}
});


/******************  FUNÇÕES  ***************/
function validaCampos(){
	try {		
		var preenchidoCorretamente = true;

		if(!emailUser.val()){
			emailUser.css('border', '2px solid red');
			preenchidoCorretamente = false;
		} else{
			emailUser.css('border', '1px solid #ced4da');
		}

		if(!senhaUser.val()){
			senhaUser.css('border', '2px solid red');
			preenchidoCorretamente = false;
		} else{
			senhaUser.css('border', '1px solid #ced4da');
		}
		return preenchidoCorretamente;
	} catch (error) {
		console.log("validaCampos(): " + error);
	}
}

function mensagem(tipo, msg){
	try {		
		$("#mensagem").addClass(tipo);
		$("#mensagem").html(msg);
		$("#mensagem").css("visibility", "visible");

		setTimeout(function(){
			$("#mensagem").css("visibility", "hidden");
		}, 3000);
	} catch (error) {
		console.log("mensagem(): " + error)
	}
} 