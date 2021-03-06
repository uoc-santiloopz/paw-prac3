<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h1>{{ isEditMode ? 'Editar' : 'Crear'}} reserva</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="alert alert-danger" v-if="errorMessage.length">
                    <p>{{ errorMessage }}</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label for="name">Nombre:</label>
                        <input
                                id="name"
                                name="name"
                                v-model="name.value"
                                v-bind:class="{ err: !name.valid }"
                                @change="name.valid = true"
                                type="text"
                                class="form-control"
                                placeholder="Me llamo..."
                                minlength="3"
                                required
                        />
                    </div>
                    <div class="form-group">
                        <label for="surnames">Apellidos:</label>
                        <input
                                id="surnames"
                                name="surnames"
                                v-model="surnames.value"
                                v-bind:class="{ err: !surnames.valid }"
                                @change="surnames.valid = true"
                                type="text"
                                class="form-control"
                                placeholder="Qué más...?"
                                minlength="3"
                                required
                        />
                    </div>
                    <div class="form-group">
                        <label for="phone">Teléfono:</label>
                        <input
                            id="phone"
                            name="phone"
                            v-model="phone.value"
                            v-bind:class="{ err: !phone.valid }"
                            @change="excludeLettersFromPhoneString"
                            type="text"
                            class="form-control"
                            placeholder="Mi teléfono"
                            minlength="9"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label class="description" for="datetime">Fecha y hora:</label>
                        <flat-pickr
                            id="datetime"
                            name="datetime"
                            v-model="reservationDate.value"
                            v-bind:class="{ err: !reservationDate.valid }"
                            @change="reservationDate.valid = true"
                            :config="reservationDate.config"
                            class="form-control"
                            placeholder="Select date"
                        >
                        </flat-pickr>
                    </div>
                    <div class="form-group">
                        <label for="guests">Nº comensales:</label>
                        <input
                                id="guests"
                                name="guests"
                                v-model="guestsAmount.value"
                                v-bind:class="{ err: !guestsAmount.valid }"
                                @change="guestsAmount.valid = true"
                                type="number"
                                placeholder="Cuántas personas...?"
                                class="form-control"
                                min="1"
                                value=""
                                required
                        />
                    </div>
                    <input
                            class="btn btn-primary"
                            name="submit"
                            type="submit"
                            :value="isEditMode ? 'Editar' : 'Crear'" />
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import dayjs from 'dayjs';
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import 'flatpickr/dist/themes/material_blue.css';

    import { API_ENDPOINTS } from '../shared/network/endpoints';


    export default {
        name: 'CreateReservationForm',
        data () {
            return {
                isEditMode: null,
                errorMessage: '',
                valid: false,
                name: {
                    value: '',
                    valid: true
                },
                surnames: {
                    value: '',
                    valid: true
                },
                phone: {
                    value: '',
                    valid: true
                },
                reservationDate: {
                    value: new Date(),
                    valid: true,
                    config: {
                        altFormat: 'M	j, Y',
                        altInput: true,
                        dateFormat: 'Y-m-d H:i',
                        enableTime: true
                    }
                },
                guestsAmount: {
                    value: null,
                    valid: true
                },
            }
        },
        components: {
            flatPickr
        },
        methods: {
            excludeLettersFromPhoneString(event) {
                this.phone.valid = true;
                this.phone.value = event.target.value.replace(/[^0-9]/g, '');
            },
            onSubmit() {
                this.errorMessage = '';
                if(this.isFormValid()) {
                    const url =
                        [
                            process.env.VUE_APP_API_BASE_URL,
                            this.isEditMode ? API_ENDPOINTS.RESERVATIONS_UPDATE : API_ENDPOINTS.RESERVATIONS_CREATE
                        ].join('');

                    const body = {
                        name: this.name.value,
                        surnames: this.surnames.value,
                        phone: this.phone.value,
                        date: dayjs(this.reservationDate.value).format('YYYY-MM-DD HH:mm:ss'),
                        guests: this.guestsAmount.value
                    };
                    const config = this.isEditMode ? {
                        params: {
                            id: this.$route.query.id
                        }
                    } : undefined
;
                    axios.post(url, body, config)
                        .catch(err => window.console.log(err))
                        .then(() => this.$router.push('/'));
                }
            },
            isFormValid() {
                this.name.valid = this.name.value && this.name.value.length > 0;
                this.surnames.valid = this.surnames.value && this.surnames.value.length > 0;
                this.phone.valid = this.phone.value && this.phone.value.length > 0;
                this.phone.valid = this.phone.value && this.phone.value.length > 0;
                return this.name.valid &&
                    this.surnames.valid &&
                    this.phone.valid &&
                    this.validateGuests() &&
                    this.validateDate()
            },
            validateGuests() {
                this.guestsAmount.valid = true;
                if (this.guestsAmount.value > 10) {
                    this.guestsAmount.valid = false;
                    this.errorMessage = 'Tienes más de 10 comensales';
                }
                return this.guestsAmount.valid;
            },
            validateDate() {
                this.reservationDate.valid = true;
                const date = dayjs(this.reservationDate.value);
                if (date.isBefore(dayjs())) {
                    this.reservationDate.valid = false;
                    this.errorMessage = 'La fecha es anterior a la fecha actual';
                } else if (date.isBefore(dayjs().add(24, 'hour'))) {
                    this.reservationDate.valid = false;
                    this.errorMessage = 'La reserva no se puede hacer con menos de un dia de antelación';
                }
                return this.reservationDate.valid;
            }
        },
        created() {
            this.isEditMode = this.$route.name === 'edit';
            if (this.isEditMode) {
                this.name.value = this.$route.query.name;
                this.surnames.value = this.$route.query.surnames;
                this.phone.value = this.$route.query.phone;
                this.reservationDate.value = new Date(this.$route.query.date);
                this.guestsAmount.value = parseInt(this.$route.query.guests);
            }
        }
    }
</script>
<style lang="scss">
    p {
        margin: 0;
    }
    .btn {
        user-select: none;
        cursor: pointer;
    }
    input {
        border-radius: 3px;
        outline: none;
    }
    .err,
    .err ~ .form-control {
        outline: 1px solid red;
    }
</style>
