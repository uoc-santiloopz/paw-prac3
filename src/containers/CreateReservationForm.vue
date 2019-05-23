<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h1>Crear reserva</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="error">
                    <p id="errMessage"></p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <form>
                    <div class="form-group">
                        <label for="name">Nombre:</label>
                        <input
                                id="name"
                                name="name"
                                type="text"
                                class="form-control"
                                value=""
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
                                type="text"
                                class="form-control"
                                value=""
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
                                type="text"
                                class="form-control"
                                value=""
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
                                v-model="date"
                                :config="config"
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
                                type="number"
                                placeholder="Cuántas personas...?"
                                class="form-control"
                                min="1"
                                value=""
                                required
                        />
                    </div>
                    <input id="saveForm" class="btn btn-primary" type="submit" name="submit" value="Crear" required/>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    // import this component
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    // theme is optional
    // try more themes at - https://chmln.github.io/flatpickr/themes/
    import 'flatpickr/dist/themes/material_blue.css';
    // localization is optional
    // @ is an alias to /src
    export default {
        name: 'CreateReservationForm',
        data () {
            return {
                // Initial value
                date: new Date(),
                // Get more form https://chmln.github.io/flatpickr/options/
                config: {
                    wrap: true, // set wrap to true only when using 'input-group'
                    altFormat: 'M	j, Y',
                    altInput: true,
                    dateFormat: 'Y-m-d',
                    enableTime: true
                },
            }
        },
        components: {
            flatPickr
        },
    }
</script>
<style>
    input {
        border-radius: 3px;
        outline: none;
    }
</style>
