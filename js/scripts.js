//
//async function obterSessionToken() {
//    try {
//      // Codifique o login e a senha em Base64
//      const base64Login = btoa('OpenTicket:mhex2024');  // Login e senha do glpi
//  
//      const response = await fetch('http://localhost/glpi/apirest.php/initSession', {
//        method: 'GET',
//        headers: {
//          'Authorization': `Basic ${base64Login}`,  // Autenticação básica com login e senha
//          'App-Token': 'hlbQDVuwbiUP0BTOqn4Sx6TaY9qTzLlyO9MBjNkt',  // App-Token
//          'Content-Type': 'application/json'
//        }
//      });
//  
//      const result = await response.json();
//      
//      if (response.ok) {
//        //console.log('Sessão iniciada com sucesso. Token de sessão:', result.session_token);
//        return result.session_token;  // Retorna o token da sessão
//      } else {
//        console.error('Erro ao iniciar a sessão:', result);
//        alert('Erro ao iniciar sessão no GLPI.');
//      }
//    } catch (error) {
//      console.error('Erro na requisição de sessão:', error);
//      alert('Erro de conexão ao iniciar a sessão.');
//    }
//}
//
//
//document.getElementById('ticketForm').addEventListener('submit', async function(event) {
//    event.preventDefault(); // Evita o comportamento padrão do envio do formulário
//
//    // Captura os valores dos inputs
//    const nameUser = document.getElementById('name').value;
//    const description = document.getElementById('description').value;
//    const section = document.getElementById('section').value;
//    const nameMachine = document.getElementById('nameMachine').value;
//
//    // Obtem o botão e o spinner
//    const loadingButton = document.getElementById('loadingButton');
//    const spinner = document.getElementById('spinner');
//    
//    // Mostra o spinner e oculta o texto
//    loadingButton.classList.add('loading');
//
//    // Obtem o session_token
//    const session_token = await obterSessionToken();
//    if (!session_token) {
//      alert('Erro ao obter o token de sessão.');
//      // Oculta o spinner e mostra o texto novamente
//      loadingButton.classList.remove('loading');
//      return;
//    }
//
//    // Constrói o corpo da requisição
//    const ticketData = {
//      input: {
//        name: `${nameUser} - ${section}`,
//        content: `${description} - ${nameMachine}`,
//        requesttypes_id: 1,   // Tipo de incidente
//        users_id_recipient: 1, // Substitua pelo ID do solicitante
//        _sections_id: section  // Certifique-se de que esta chave esteja correta no seu GLPI
//      }
//    };
//
//    // Envia a requisição para a API do GLPI
//    try {
//      const response = await fetch('http://localhost/glpi/apirest.php/Ticket/', {
//        method: 'POST',
//        headers: {
//          'Session-Token': session_token,
//          'Authorization': '3hRtIe6Qpd1Kh53zEokBbthYnFUYTR9Acy0hqDLX', // Substitua pelo seu User Token
//          'App-Token': 'hlbQDVuwbiUP0BTOqn4Sx6TaY9qTzLlyO9MBjNkt',      // Substitua pelo seu App Token
//          'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(ticketData)
//      });
//
//      const result = await response.json();
//      if (response.ok) {
//        alert('Chamado aberto com sucesso!');
//        console.log(result);
//      } else {
//        alert('Erro ao abrir chamado!');
//        console.error(result);
//      }
//    } catch (error) {
//      console.error('Erro na requisição:', error);
//      alert('Erro de conexão com o servidor.');
//    } finally {
//      // Oculta o spinner e mostra o texto novamente após a requisição
//      loadingButton.classList.remove('loading');
//    }
//});

document.getElementById('ticketForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Evita que o formulário seja enviado

  const nameUser = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const section = document.getElementById('section').value;
  const nameMachine = document.getElementById('nameMachine').value;

  // Valida os campos
  const isValidName = validateInput('name', !nameUser);
  const isValidDescription = validateInput('description', !description);
  const isValidSection = validateInput('section', !section || section === "Selecionar");
  const isValidNameMachine = validateInput('nameMachine', !nameMachine);

  // Se todos os campos estão válidos, você pode continuar com a lógica de submissão aqui
  if (isValidName && isValidDescription && isValidSection && isValidNameMachine) {
    handleCalled()
    document.getElementById('msgErro').style.display = 'none'; // Oculta a mensagem de erro
  } else {
    document.getElementById('msgErro').style.display = 'block'; // Exibe a mensagem de erro
  }
});

function erroInputs(element, newClass) {
  element.classList.remove('input-content-erro');
  element.classList.remove('input-content');
  element.classList.add(newClass);
}

function validateInput(inputId, condition) {
  const inputElement = document.getElementById(inputId);
  erroInputs(inputElement, condition ? 'input-content-erro' : 'input-content');

  // Retorna verdadeiro se o campo for válido, falso caso contrário
  return !condition;
}

async function obterSessionToken() {
    try {
      // Codifique o login e a senha em Base64
      const base64Login = btoa('OpenTicket:mhex2024');  // Login e senha do glpi
  
      const response = await fetch('http://localhost/glpi/apirest.php/initSession', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${base64Login}`,  // Autenticação básica com login e senha
          'App-Token': 'hlbQDVuwbiUP0BTOqn4Sx6TaY9qTzLlyO9MBjNkt',  // App-Token
          'Content-Type': 'application/json'
        }
      });
  
      const result = await response.json();
      
      if (response.ok) {
        //console.log('Sessão iniciada com sucesso. Token de sessão:', result.session_token);
        return result.session_token;  // Retorna o token da sessão
      } else {
        console.error('Erro ao iniciar a sessão:', result);
        alert('Erro ao iniciar sessão no GLPI.');
      }
    } catch (error) {
      console.error('Erro na requisição de sessão:', error);
      alert('Erro de conexão ao iniciar a sessão.');
    }
}

async function handleCalled() {
  const nameUser = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const section = document.getElementById('section').value;
  const nameMachine = document.getElementById('nameMachine').value;

  // Obtém o botão e o spinner
  const loadingButton = document.getElementById('loadingButton');
  const spinner = document.getElementById('spinner');
  
  // Mostra o spinner e oculta o texto
  loadingButton.classList.add('loading');

  // Obtém o session_token
  const session_token = await obterSessionToken();
  if (!session_token) {
    alert('Erro ao obter o token de sessão.');
    loadingButton.classList.remove('loading');
    return;
  }

  // Constrói o corpo da requisição
  const ticketData = {
    input: {
      name: `${nameUser} - ${section}`,
      content: `${description} - ${nameMachine}`,
      requesttypes_id: 1,   // Tipo de incidente
      users_id_recipient: 1, // Substitua pelo ID do solicitante
      _sections_id: section  // Certifique-se de que esta chave esteja correta no seu GLPI
    }
  };

  // Envia a requisição para a API do GLPI
  try {
    const response = await fetch('http://localhost/glpi/apirest.php/Ticket/', {
      method: 'POST',
      headers: {
        'Session-Token': session_token,
        'Authorization': '3hRtIe6Qpd1Kh53zEokBbthYnFUYTR9Acy0hqDLX', // Substitua pelo seu User Token '3hRtIe6Qpd1Kh53zEokBbthYnFUYTR9Acy0hqDLX'
        'App-Token': 'hlbQDVuwbiUP0BTOqn4Sx6TaY9qTzLlyO9MBjNkt', // Substitua pelo seu App Token 'hlbQDVuwbiUP0BTOqn4Sx6TaY9qTzLlyO9MBjNkt'
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticketData)
    });

    const result = await response.json();
    if (response.ok) {
      AmostraPopUp("Chamado criado com sucesso!"); // Chama a função com a mensagem correta
      console.log(result);
    } else {
      AmostraPopUp("Erro ao abrir chamado!"); // Chama a função com mensagem de erro
      console.error(result);
    }
  } catch (error) {
    AmostraPopUp("Erro ao fazer o chamado"); // Chama a função com mensagem de erro
  } finally {
    // Oculta o spinner e mostra o texto novamente após a requisição
    loadingButton.classList.remove('loading');
  }
}

function AmostraPopUp(novoTexto) {
  const popUp = document.querySelector('.popup-wrapper-logount');
  if (!popUp) {
    console.error('Elemento .popup-wrapper-logount não encontrado!');
    return; // Retorna se o elemento não for encontrado
  }
  const popUpTexto = popUp.querySelector('.popup-content-text');

  // Altera o texto, se o parâmetro 'novoTexto' for fornecido
  if (novoTexto && popUpTexto) {
    popUpTexto.textContent = novoTexto;
  }

  popUp.style.display = 'flex'; // Exibe o pop-up

  document.addEventListener("click", (e) => {
    const el = e.target;

    if (el.classList.contains('popup-close') || el.classList.contains('btnPopupSim')) {
      popUp.style.display = 'none'; // Fecha o pop-up
    }
  });
}

