import { keyboard } from './keyboard.js'
import IO from './io.js'
import { buildCommands } from './commands.js'

import Server from '../server/server.js'

const input = IO.processKeystrokes(keyboard)
const commands = buildCommands(input)

Server.registerCommandStream(commands)
Server.commandStrings.each(IO.setCommandLineText)