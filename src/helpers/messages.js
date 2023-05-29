/* eslint-disable class-methods-use-this */
const messages = new Map()

messages.set('auth/email-already-in-use', 'O e-mail informado já está cadastrado. ')
messages.set('auth/email-already-exists', 'O e-mail informado já está cadastrado. ')
messages.set('auth/weak-password', 'A senha deve ter pelo menos 6 caracteres.')
messages.set('auth/user-not-found', 'Usuário não cadastrado.')
messages.set('auth/wrong-password', 'Senha incorreta.')
messages.set('auth/requires-recent-login',
  'Esta operação é sensível e requer autenticação recente.' +
  'Efetue login novamente antes de tentar novamente esta solicitação.')

export default messages
