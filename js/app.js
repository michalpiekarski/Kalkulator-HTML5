function toggleToolsCategory(category) {
    if(category.hasAttribute("hidden")) {
        category.removeAttribute("hidden");
        event.currentTarget.style.cursor = "n-resize";
    } else {
        category.setAttribute("hidden");
        event.currentTarget.style.cursor = "s-resize";
    }
}