class Tool {
    constructor() {
        this.name = "Tool"
        this.description = "This is a tool"
        this.icon = "assets/freehand.png"

        this.previousMouseX = -1 
        this.previousMouseY = -1 

        this.initialize()
    }

    initialize() {
        // Empty setup block, meant to be replaced by specific tools
        return
    }

    draw() {
        // Called repeatedly while this tool is active, override for custom behavior
        return
    }

    mouseDragged(){
        // Triggered when the mouse is moved while pressed, customize for drawing or interaction
        return
    }

    unselectTool() {
        // Cleanup logic when user switches to another tool
        return
    }

    populateOptions() {
        // Used to add custom options or controls in the tool panel
        return
    }
}
