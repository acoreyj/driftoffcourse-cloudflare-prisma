import sgMail from '@sendgrid/mail';

export type ConfirmationParams = {
	name?: string;
	buttons?: { href: string; text: string }[];
	reservationText: string;
	btnText: string;
	btnHref: string;
	instructionsText: string;
	heroImgSrc: string;
	heroImgHref: string;
};

export const sendConfirmationEmail = async (
	to: string,
	confirmationParams: ConfirmationParams
) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
	try {
		await sgMail.send({
			to,
			bcc: 'reservations@driftoffcoursechetek.com',
			from: 'reservations@em7084.driftoffcoursechetek.com',
			replyTo: 'support@driftoffcoursechetek.com',
			subject: 'Drift Off Course Chetek: Reservation Confirmed',
			html: reservationConfirmation(confirmationParams),
		});
	} catch (e) {
		console.error(JSON.stringify(e));
		return;
	}
	console.log('email sent');
};

export const reservationConfirmation = ({
	name = '',
	reservationText,
	btnText,
	btnHref,
	instructionsText,
	heroImgHref,
	heroImgSrc,
	buttons = [],
}: ConfirmationParams) => {
	return `<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0;">
	<meta name="format-detection" content="telephone=no" />

	<!-- Responsive Mobile-First Email Template by Konstantin Savchenko, 2015.
	https://github.com/konsav/email-templates/  -->

	<style>
		/* Reset styles */
		body {
			margin: 0;
			padding: 0;
			min-width: 100%;
			width: 100% !important;
			height: 100% !important;
		}

		body,
		table,
		td,
		div,
		p,
		a {
			-webkit-font-smoothing: antialiased;
			text-size-adjust: 100%;
			-ms-text-size-adjust: 100%;
			-webkit-text-size-adjust: 100%;
			line-height: 100%;
		}

		table,
		td {
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
			border-collapse: collapse !important;
			border-spacing: 0;
		}

		img {
			border: 0;
			line-height: 100%;
			outline: none;
			text-decoration: none;
			-ms-interpolation-mode: bicubic;
		}

		#outlook a {
			padding: 0;
		}

		.ReadMsgBody {
			width: 100%;
		}

		.ExternalClass {
			width: 100%;
		}

		.ExternalClass,
		.ExternalClass p,
		.ExternalClass span,
		.ExternalClass font,
		.ExternalClass td,
		.ExternalClass div {
			line-height: 100%;
		}

		/* Extra floater space for advanced mail clients only */
		@media all and (max-width: 600px) {
			.floater {
				width: 320px;
			}
		}

		/* Set color for auto links (addresses, dates, etc.) */
		a,
		a:hover {
			color: #127DB3;
		}

		.footer a,
		.footer a:hover {
			color: #999999;
		}
	</style>

	<!-- MESSAGE SUBJECT -->
	<title>Get this responsive email template</title>

</head>

<!-- BODY -->
<!-- Set message background color (twice) and text color (twice) -->

<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
	background-color: #FFFFFF;
	color: #000000;" bgcolor="#FFFFFF" text="#000000">

	<!-- SECTION / BACKGROUND -->
	<!-- Set section background color -->
	<table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background">
		<tr>
			<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;" bgcolor="#127DB3">

				<!-- WRAPPER -->
				<!-- Set wrapper width (twice) -->
				<table border="0" cellpadding="0" cellspacing="0" align="center" width="600" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 600px;" class="wrapper">

					<tr>
						<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 20px;">

							<!-- PREHEADER -->
							<!-- Set text color to background color -->
							<div style="display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0;
			color: #FFFFFF;" class="preheader">
							Reservation confirmed with Drift Off Course Chetek.</div>

							<!-- LOGO -->
							<!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2. URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content=logo&utm_campaign={{Campaign-Name}} -->
							<a target="_blank" style="text-decoration: none;" href="https://driftoffcoursechetek.com/"><img border="0" vspace="0" hspace="0" src="https://raw.githubusercontent.com/konsav/email-templates/master/images/logo-white.png" width="100" height="30" alt="Logo" title="Logo" style="
				color: #000000;
				font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>

						</td>
					</tr>

					<!-- HEADER -->
					<!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
					<tr>
						<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
			padding-top: 20px;
			color: #FFFFFF;
			font-family: sans-serif;" class="header">
							DRIFT OFF COURSE CHETEK
						</td>
					</tr>

					<!-- SUBHEADER -->
					<!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
					<tr>
						<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #FFFFFF;
			font-family: sans-serif;" class="subheader">
							Thank you ${name}. Your reservation is confirmed!
						</td>
					</tr>

					<!-- HERO IMAGE -->
					<!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 (wrapper x2). Do not set height for flexible images (including "auto"). URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Ìmage-Name}}&utm_campaign={{Campaign-Name}} -->
					<tr>
						<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero"><a target="_blank" style="text-decoration: none;" href="${heroImgHref}"><img border="0" vspace="0" hspace="0" src="${heroImgSrc}" alt="Please enable images to view this content" title="Hero Image" width="530" style="
			width: 88.33%;
			max-width: 530px;
			color: #FFFFFF; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a></td>
					</tr>

					<!-- PARAGRAPH -->
					<!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
					<tr>
						<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: #FFFFFF;
			font-family: sans-serif;" class="paragraph">
							${instructionsText}
						</td>
					</tr>

					<!-- BUTTON -->
					<!-- Set button background color at TD, link/text color at A and TD, font family ("sans-serif" or "Georgia, serif") at TD. For verification codes add "letter-spacing: 5px;". Link format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Button-Name}}&utm_campaign={{Campaign-Name}} -->
					<tr>
						<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 35px;" class="button"><a href="${btnHref}" target="_blank" style="text-decoration: underline;">
								<table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
									<tr>
										<td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;" bgcolor="#0B5073"><a target="_blank" style="text-decoration: underline;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;" href="${btnHref}">
												${btnText}
											</a>
										</td>
									</tr>
								</table>
							</a>
						</td>
					</tr>

					<!-- End of WRAPPER -->
				</table>

				<!-- SECTION / BACKGROUND -->
				<!-- Set section background color -->
			</td>
		</tr>
		<tr>
			<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
	padding-top: 5px;" bgcolor="#FFFFFF">

				<!-- WRAPPER -->
				<!-- Set conteiner background color -->
				<table border="0" cellpadding="0" cellspacing="0" align="center" width="600" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 600px;">
					<!-- PARAGRAPH -->
					<!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
					<tr>
						<td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
				padding-top: 25px; 
				color: #000000;
				font-family: sans-serif;" class="paragraph">
							${reservationText}
						</td>
					</tr>

					${buttons.map(
						({ text, href }) => `					<!-- BUTTON -->
					<!-- Set button background color at TD, link/text color at A and TD, font family ("sans-serif" or "Georgia, serif") at TD. For verification codes add "letter-spacing: 5px;". Link format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Button-Name}}&utm_campaign={{Campaign-Name}} -->
					<tr>
						<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 30px;
			padding-bottom: 35px;" class="button"><a href="${href}" target="_blank" style="text-decoration: underline;">
								<table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
									<tr>
										<td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;" bgcolor="#127DB3"><a target="_blank" style="text-decoration: underline;
					color: #000000; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;" href="${href}">
												${text}
											</a>
										</td>
									</tr>
								</table>
							</a>
						</td>
					</tr>`
					)}


					<!-- End of WRAPPER -->
				</table>

				<!-- SECTION / BACKGROUND -->
				<!-- Set section background color -->
			</td>
		</tr>
		<tr>
			<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;" bgcolor="#F0F0F0">

				<!-- WRAPPER -->
				<!-- Set wrapper width (twice) -->
				<table border="0" cellpadding="0" cellspacing="0" align="center" width="600" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 600px;" class="wrapper">

					<!-- FOOTER -->
					<!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
					<tr>
						<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
			padding-top: 20px;
			padding-bottom: 20px;
			color: #999999;
			font-family: sans-serif;" class="footer">

							<a href="https://driftoffcoursechetek.com" target="_blank" style="text-decoration: underline; color: #999999; font-family: sans-serif; font-size: 13px; font-weight: 400; line-height: 150%;">Drift Off Course Chetek</a><br/>


						</td>
					</tr>

					<!-- End of WRAPPER -->
				</table>

				<!-- End of SECTION / BACKGROUND -->
			</td>
		</tr>
	</table>

</body>

</html>`;
};
