let nodemailer = require('nodemailer');
let {antTabela, apTabela} = require('./corpo_email.js');
let Email = require('../model/email.js');
const cron = require('node-cron');

let email = new Email();

class ControllerEmail{
    async construir_email(){
        
        let dados = await email.buscarDados();
        let conteudoTabela = ``
        if(dados){
            dados.forEach(dado =>{
                if(dado.Ultimo_Registro == 'Não'){
                    conteudoTabela = conteudoTabela + `
                    <tr><td align=center><font size=2 color=#000000 face=Arial>         ${dado.CNOMEPESS}
                    </font></td><td align=center><font size=2 color=#000000 face=Arial> ${dado.Data}
                    </font></td><td align=center><font size=2 color=#000000 face=Arial> Unimed Saúde
                    </font></td><td align=center><font size=2 color=#000000 face=Arial> ${dado.CDESCEQUI}
                    </font></td></tr>` 
                }else{
                    conteudoTabela = conteudoTabela + `
                    <tr><td align=center><font size=2 color=#000000 face=Arial>         ${dado.CNOMEPESS}
                    </font></td><td align=center><font size=2 color=#000000 face=Arial> ${dado.Data}
                    </font></td><td align=center><font size=2 color=#000000 face=Arial> Unimed Saúde
                    </font></td><td align=center><font size=2 color=#000000 face=Arial> ${dado.CDESCEQUI}
                    </font></td></tr>` 
                    let htmlEmail = antTabela + conteudoTabela + apTabela;
            
                    let corpoEmail = {
                        from:'gm589072@gmail.com',
                        to: dado.CEMAILPRES,
                        subject:'Pacientes que passaram por Consulta',
                        html: htmlEmail
                    };
                    
                    this.Envio(corpoEmail)

                    htmlEmail = ``
                    conteudoTabela = ``
                }
                
                
            })
        }
        
    }

    async Envio(corpoEmail){

        let envio = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user:'gm589072@gmail.com',
                pass:'clyo slfk kjgs fdzu'
            }
        });

        envio.sendMail(corpoEmail, async function(error, info){
            if(error){
                console.log('Ocorreu um erro: ' + error);
            }else{
                await email.salvarEmail(corpoEmail);
                console.log('E-mail enviado: ' + info.response);
            }
        
        });
    }

}

let controlEmail = new ControllerEmail();

cron.schedule('57 16 * * *', function() {
    controlEmail.construir_email();
  });