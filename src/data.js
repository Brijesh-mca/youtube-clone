export const API_KEY = 'AIzaSyCf6ZGOytAuutJs86xqXVDBH37xF9KHjn4'

export const value_con = (value) => {
    if (value >= 1000000) {
        return Math.floor(value / 1000000) + "M";
    }
    else if (value >= 1000) {
        return Math.floor(value / 1000) + "K";
    }
    else {
        return value;
    }
}
