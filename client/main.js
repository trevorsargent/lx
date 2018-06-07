import { keyboard } from './keyboard.js'
import IO from './io.js'
import CMD from './commands.js'

import Server from '../server/server.js'

const input = IO.handleAndTypeInput(keyboard)
const commands = CMD.buildCommands(input)

Server.registerCommandStream(commands)
Server.commandStrings.each(IO.setCommandLineText)


