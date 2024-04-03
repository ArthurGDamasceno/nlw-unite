let participantes = [
  {
    nome: "Tainá Vasco",
    email: "taina@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Arthur Damasceno",
    email: "arthur@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 12, 30),
    dataCheckIn: null
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 10, 0),
    dataCheckIn: new Date(2024, 0, 6, 11, 0)
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 3, 8, 45),
    dataCheckIn: new Date(2024, 2, 3, 9, 30)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 14, 16, 0),
    dataCheckIn: null
  },
  {
    nome: "Laura Costa",
    email: "laura@gmail.com",
    dataInscricao: new Date(2024, 0, 20, 14, 10),
    dataCheckIn: new Date(2024, 0, 21, 15, 0)
  },
  {
    nome: "Gabriel Pereira",
    email: "gabriel@gmail.com",
    dataInscricao: new Date(2024, 1, 28, 22, 45),
    dataCheckIn: new Date(2024, 2, 2, 8, 0)
  },
  {
    nome: "Juliana Almeida",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 18, 20),
    dataCheckIn: new Date(2024, 0, 16, 20, 10)
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 1, 5, 9, 30),
    dataCheckIn: new Date(2024, 1, 6, 10, 15)
  }
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td> ${dataInscricao} </td>
    <td> ${dataCheckIn} </td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""

  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)
  
  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if (participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email 
  )

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}