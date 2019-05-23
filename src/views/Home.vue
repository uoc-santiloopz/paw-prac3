<template>
    <div class='container'>
        <div class='row'>
          <div class='col-xs-12'>
            <h1>Listado de reservas</h1>
          </div>
        </div>
        <div class='row d-none'>
          <div class='col-xs-12'>
            <a>Próximas 24 horas</a>
          </div>
        </div>
        <div class='row' id='reservationsTableContainer'>
          <div class='col-xs-12'>
            <h3 v-if="!dades">No hay reservas que mostrar</h3>
            <table v-else class="table">
                <thead>
                    <tr scope="col">
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="row">
                        <td></td>
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
        <div class='row'>
          <div class='col-xs-12'>
            <button class='btn btn-primary'>Crear reserva</button>
          </div>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
import * as axios from 'axios';
import ReservationList from '@/components/ReservationList.vue'
import { API_ENDPOINTS } from '../shared/network/endpoints';

export default {
    name: 'Home',
    data: () => ({
        dades: null,
    }),
    components: {
        ReservationList
    },
    created() {
        axios
            .get([process.env.VUE_APP_API_BASE_URL, API_ENDPOINTS.ALL_RESERVATIONS].join(''))
            .then(res => this.dades = res.data);
    }
}
</script>
