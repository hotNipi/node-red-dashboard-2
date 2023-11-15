const statestore = require('../store/state.js')

module.exports = function (RED) {
    function DropdownNode (config) {
        // create node in Node-RED
        RED.nodes.createNode(this, config)
        const node = this

        // which group are we rendering this widget
        const group = RED.nodes.getNode(config.group)

        const evts = {
            onChange: true,
            beforeSend: function (msg) {
                if (msg.options) {
                    // dynamically set "options" property
                    statestore.set(node.id, 'options', msg.options)
                }
                return msg
            }
        }

        // inform the dashboard  UI that we are adding this node
        group.register(node, config, evts)
    }

    RED.nodes.registerType('ui-dropdown', DropdownNode)
}
