
// signup code start here

$(document).ready(function(){
	$(".signup-form").submit(function(e){
		e.preventDefault();
		var password = $("#password").val();
		if(password.length <= 8)
		{
		if($("#password").val() == $("#re-password").val())
		{
			$.ajax({
			type : "POST",
			url : "pages/php/register.php",
			data : new FormData(this),
			processData : false,
			contentType : false,
			cache : false,
			beforeSend : function(){
				$(".signup-btn").html("Please wait..");
				$(".signup-btn").attr("disabled","disabled");
			},
			success : function(response){
				$(".signup-btn").html("Signup Now");
				if(response.trim() == "success")
				{
					var div = document.createElement("DIV");
					div.className = "alert-success w-75 p-3 mt-3";
					div.innerHTML = "Thank you for signup with us";
					$(".signup-notice").append(div);
					setTimeout(function(){
						$(".signup-notice").html("");
					},2000);
					$(".signup-btn").removeAttr("disabled");
					$(".signup-form").trigger('reset');
				}
				else
				{
					var div = document.createElement("DIV");
					div.className = "alert-success w-75 p-3 mt-3";
					div.innerHTML = response;
					$(".signup-notice").append(div);
					setTimeout(function(){
						$(".signup-notice").html("");
					},2000);
					$(".signup-btn").removeAttr("disabled");
					$(".signup-form").trigger('reset');	
				}
			}

		});
		}
		else
		{
			alert("password not match");
		}
		}
		else
		{
			alert("password less then 8 digit");
		}
		
	});

});

//end signup code here


//login code start here

$(document).ready(function(){
	$(".login-form").submit(function(e){
		e.preventDefault();
		$.ajax({
			type  : "POST",
			url : "pages/php/login.php",
			data : new FormData(this),
			processData : false,
			contentType : false,
			cache : false,
			beforeSend : function()
			{
				$(".login-btn").html("Please wait..");
				$(".login-btn").attr("disabled","disabled");
			},
			success : function(response)
			{
				if(response.trim() == "success")
				{
					window.location = "http://localhost/bookstore/shop/index.php";
				}
				else if(response.trim() == "pending")
				{
					

					// verify code

					$(".login-form").addClass("d-none");
					$(".otp-box").removeClass("d-none");
					$(".verify-btn").click(function(){
						var otp = $(".otp").val();
						var email = $("#email").val();
						$.ajax({
							type : "POST",
							url : "pages/php/verify.php",
							data : {
								otp : Number(otp),
								email : email
							},
							beforeSend : function()
							{
								$(".verify-btn").html("Please wait..");
								$(".verify-btn").attr("disabled","disabled");
							},
							success : function(response){
								$(".verify-btn").html("Verify");
								if(response.trim() =="success")
								{
									window.location = "http://localhost/bookstore/shop/index.php";


								}
								else
								{
									var div = document.createElement("DIV");
										div.className = "alert-warning w-75 mt-3 p-3";
										div.innerHTML = response;
										$(".login-notice").append(div);
										setTimeout(function(){

										$(".login-notice").html("");
										var otp = $(".otp").val("");
										$(".verify-btn").removeAttr("disabled");
												},2000);	
								}
							}
						});
					});
					//end verify otp code

					//resend otp 
					$(".resend-btn").click(function(){
						var email = $("#email").val();
						$.ajax({
							type : "POST",
							url : "pages/php/resend.php",
							data : {
								email : email
							},
							beforeSend : function()
							{
								$(".resend-btn").html("please wait...");
								$(".resend-btn").attr("disabled","disabled");
							},
							success : function(response)
							{
								$(".resend-btn").html("Resend");
								$(".resend-btn").removeAttr("disabled");
								var div = document.createElement("DIV");
										div.className = "alert-warning w-75 mt-3 p-3";
										div.innerHTML = response;
										$(".login-notice").append(div);
										setTimeout(function(){
										$(".login-notice").html("");
										},2000);
							}
						});
					});

					// end resend otp code
				} 
				else
				{
					$(".login-btn").html("Login Now");
					$(".login-btn").removeAttr("disabled");
					$(".login-form").trigger('reset');
					var div = document.createElement("DIV");
					div.className = "alert-warning w-75 mt-3 p-3";
					div.innerHTML = response;
					$(".login-notice").append(div);	
					$(".login-notice").append(div);
					setTimeout(function(){
						$(".login-notice").html("");
					},2000);
					
				}
			}
		});
	});
});

//login code end here


// forgot password code


$(document).ready(function(){
	$(".send-otp").click(function(){
		var email = $(".email").val();
		$.ajax({
			type : "POST",
			url : "pages/php/resend.php",
			data : {
				email : email
			},
			beforeSend : function(){
				$(".send-otp").html("please wait..");
			},
			success : function(response){
				$(".send-otp").html("Submit");
				$(".email").val("");
				if(response.trim() == "please check your email and verify your account")
				{
					$(".email-box").addClass("d-none");
					$(".otp-box").removeClass("d-none");

					// verify otp

					$(".verify-btn").click(function(){
						var otp = $(".otp").val();
						$.ajax({
							type : "POST",
							url : "pages/php/verify.php",
							data : {
								otp : Number(otp),
								email : email
							},
							beforeSend : function()
							{
								$(".verify-btn").html("Please wait..");
								$(".verify-btn").attr("disabled","disabled");
							},
							success : function(response){
								$(".verify-btn").html("Verify");
								if(response.trim() =="success")
								{
									$(".otp-box").addClass("d-none");
									$(".new-password-box").removeClass("d-none");
									$(".change-password-btn").click(function(){
										$(".change-password-btn").attr("disabled","disabled");
										var password = $("#new-password").val();
										if(password == $("#re-new-password").val())
										{
											$.ajax({
												type : "POST",
												url : "pages/php/change_password.php",
												data : {
													email : email,
													password : password
												},
												beforeSend : function(){
													$(".change-password-btn").attr("disabled","disabled");
													$(".change-password-btn").html("Please wait..");
												},
												success : function(response)
												{
													var div = document.createElement("DIV");
												div.className = "alert-success w-75 mt-3 p-3";
												div.innerHTML = response;
												$(".forgot-notice").append(div);
												}
											});
										}
										else
										{
											var div = document.createElement("DIV");
											div.className = "alert-warning w-75 mt-3 p-3";
											div.innerHTML = "password and re entered password must be same";
												$(".forgot-notice").append(div);
											setTimeout(function(){

											$(".forgot-notice").html("");
											
											$(".change-password-btn").removeAttr("disabled");
												},2000);	
										}
									});


								}
								else
								{
									var div = document.createElement("DIV");
										div.className = "alert-warning w-75 mt-3 p-3";
										div.innerHTML = response;
										$(".forgot-notice").append(div);
										setTimeout(function(){

										$(".forgot-notice").html("");
										var otp = $(".otp").val("");
										$(".verify-btn").removeAttr("disabled");
												},2000);	
								}
							}
						});
					});
					//end verify otp code
					//resend otp 
					$(".resend-btn").click(function(){
						
						$.ajax({
							type : "POST",
							url : "pages/php/resend.php",
							data : {
								email : email
							},
							beforeSend : function()
							{
								$(".resend-btn").html("please wait...");
								$(".resend-btn").attr("disabled","disabled");
							},
							success : function(response)
							{
								$(".resend-btn").html("Resend");
								$(".resend-btn").removeAttr("disabled");
								var div = document.createElement("DIV");
										div.className = "alert-warning w-75 mt-3 p-3";
										div.innerHTML = response;
										$(".forgot-notice").append(div);
										setTimeout(function(){
										$(".forgot-notice").html("");
										},2000);
							}
						});
					});

					// end resend otp code

				}
				else
				{
					var div = document.createElement("DIV");
					div.className = "alert-warning w-75 mt-3 p-3";
					div.innerHTML = response;
					$(".forgot-notice").append(div);	
				}
			}
		});
	});
});


// upload file code 

$(document).ready(function(){
		$(".upload-form").submit(function(e){
			e.preventDefault();
			$.ajax({
				type : "POST",
				url : "pages/php/upload.php",
				data : new FormData(this),
				processData : false,
				contentType : false,
				cache : false,
				xhr : function()
				{
					var request = new XMLHttpRequest();
					request.upload.onprogress = function(e)
					{
						var percentage = Math.floor((e.loaded*100)/e.total);
						$(".upload-bar").css({
							width : percentage+"%"
						});
						$(".upload-bar").html(percentage+"%");

					}
					return request;
				},
				beforeSend : function()
				{
					$(".upload-bar-con").removeClass("d-none");
					$(".upload-btn").html("Please wait...");
					$(".upload-btn").attr("disabled","disabled");
				},
				success : function(response)
				{
					
					if(response.trim() == "success")
					{
						var div = document.createElement("DIV");
						div.className = "alert-success p-2 text-center";
						div.innerHTML = "Your book uploading successfull";
						$(".upload-notice").append(div);
						setTimeout(function(){
							$(".upload-bar-con").addClass("d-none");
							$(".upload-btn").html("Upload");
							$(".upload-form").trigger('reset');
							$(".upload-btn").removeAttr("disabled");
							$(".upload-notice").html("");
						},2000);
					}
					else
					{
						var div = document.createElement("DIV");
						div.className = "alert-warning p-2 text-center";
						div.innerHTML = response;
						$(".upload-notice").append(div);
						setTimeout(function(){
							$(".upload-bar-con").addClass("d-none");
							$(".upload-btn").html("Upload");
							$(".upload-form").trigger('reset');
							$(".upload-btn").removeAttr("disabled");
							$(".upload-notice").html("");
						},2000);
					}
				}
			});
		});
	});

// end upload code

// dynamic page request

$(document).ready(function(){
	
	$(".menu").each(function(){
		$(this).click(function(){
			$(".menu").removeClass("border border-primary");
			var link = $(this).attr("link");	
			$(this).addClass("border border-primary");	
			$.ajax({
				type : "POST",
				url : link,
				success : function(response){
					$(".dynamic-result").html(response);
				}
			});
		});
	

	});
});

// edit profile code 

$(document).ready(function(){
			$(".edit-form").submit(function(e){
				e.preventDefault();
				$.ajax({
					type : "POST",
					url : "pages/php/edit_details.php",
					data : new FormData(this),
					processData : false,
					contentType : false,
					cache : false,
					beforeSend : function()
					{
						var div = document.createElement("DIV");
						div.className = "alert-warning p-3 text-center";
						div.innerHTML = "Please wait"
						$(".edit-notice").append(div);
						$(".save-btn").attr("disabled","disabled");
					},
					success : function(response)
					{
						$(".edit-notice").html("");
						var div = document.createElement("DIV");
						div.className = "alert-success p-3 text-center";
						div.innerHTML = response;
						$(".edit-notice").append(div);
						$(".save-btn").removeAttr("disabled");
						$(".edit-form").trigger("reset");
						setTimeout(function(){
							$(".edit-notice").html("");
						},3000);	
					}
				});
			});
		
	});