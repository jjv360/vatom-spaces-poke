/**
 * This is the main entry point for your plugin.
 *
 * All information regarding plugin development can be found at
 * https://developer.vatom.com/plugins/plugins/
 *
 * @license MIT
 * @author Vatom Inc.
 */
export default class MyPlugin extends BasePlugin {

    /** Plugin info */
    static id = "jjv360.poke"
    static name = "Poke"

    /** Called on load */
    onLoad() {

        // Create a button in the toolbar
        this.menus.register({
            section: 'usermenu',
            icon: this.paths.absolute('button-icon.png'),
            title: 'Poke me',
            action: this.onPoke.bind(this)
        })

        // Preload poke sound effect
        this.audio.preload(this.paths.absolute('poke.wav'))

    }

    /** Called when the user presses the action button */
    async onPoke(e) {

        // Play sound effect
        this.audio.play(this.paths.absolute('poke.wav'))

        // Send notice to the other user
        let username = await this.user.getDisplayName()
        this.messages.send({ action: 'poke', from: username }, false, e.user.id)

    }

    /** Called when a message is received */
    onMessage(msg) {

        // Check message type
        if (msg.action == 'poke') {

            // Show toast message
            let text = `You've been poked by <b>${msg.from}</b>!`
            this.menus.toast({ text, duration: 5000 })

            // Play sound effect
            this.audio.play(this.paths.absolute('poke.wav'))

        }

    }

}
