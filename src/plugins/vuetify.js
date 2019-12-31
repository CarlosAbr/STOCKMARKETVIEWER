import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueGoogleCharts from 'vue-google-charts'

Vue.use(VueGoogleCharts)
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: '#8dc6cb',
                secondary: '#2a2a3f',
                secondary_light: '#474747',
                accent: '#bfbfbf',
                accent_light: '#f7f7f7',
                error: '#FF5252',
                info: '#a8dfdc',
                info_light: '#97ffdc',
                success: '#b0c466',
                warning: '#efcd60'
            },
        },
    },
});