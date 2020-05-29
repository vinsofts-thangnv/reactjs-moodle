let initState = {
}
const appStateLocal = localStorage.getItem('appState');
if (appStateLocal) {
    initState = JSON.parse(appStateLocal);
}

export default initState;