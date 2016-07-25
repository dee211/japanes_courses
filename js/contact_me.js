$(function() {

    $("input, textarea", '#contactForm').jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $('input[name="name"]', $form).val();
            // var email = $("input#email").val();
            var phone = $('input[name="phone"]', $form).val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    type: 'Форма обратной связи',
                    // email: email,
                    message: message
                },
                cache: false,
                success: function(data, textStatus) {
                    // Success message
                    $('.success', '#contactForm').html("<div class='alert alert-success'>");
                    $('.success > .alert-success', '#contactForm').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('.success > .alert-success', '#contactForm')
                        .append("<strong>Ваше сообщение отправлено. </strong>");
                    $('.success > .alert-success', '#contactForm')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // Fail message
                    $('.success', '#contactForm').html("<div class='alert alert-danger'>");
                    $('.success > .alert-danger', '#contactForm').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('.success > .alert-danger', '#contactForm').append("<strong>Извините " + firstName + ", сервер не доступен! Попробуйте позже!");
                    $('.success > .alert-danger', '#contactForm').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        }
    });

    var get_subscrive = function(selector, id, type) {
        $(selector, id).jqBootstrapValidation({
            preventSubmit: true,
            submitError: function($form, event, errors) {
                // additional error messages or events
            },
            submitSuccess: function($form, event) {
                event.preventDefault(); // prevent default submit behaviour
                // get values from FORM
                var name = $('input[name="name"]', $form).val();
                // var email = $("input#email").val();
                var phone = $('input[name="phone"]', $form).val();
                var firstName = name; // For Success/Failure Message
                // Check for white space in name for Success/Fail message
                if (firstName.indexOf(' ') >= 0) {
                    firstName = name.split(' ').slice(0, -1).join(' ');
                }
                $.ajax({
                    url: "././mail/contact_me.php",
                    type: "POST",
                    data: {
                        name: name,
                        phone: phone,
                        type: type
                    },
                    cache: false,
                    success: function(data, textStatus) {
                        // Success message
                        $('.success', id).html("<div class='alert alert-success'>");
                        $('.success > .alert-success', id).html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('.success > .alert-success', id)
                            .append("<small><b>Ваше сообщение отправлено.</b></small>");
                        $('.success > .alert-success', id)
                            .append('</div>');

                        //clear all fields
                        $(id + ' form').trigger("reset");
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        // Fail message
                        $('.success', id).html("<div class='alert alert-danger'>");
                        $('.success > .alert-danger', id).html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('.success > .alert-danger', id).append("<small><b>Извините " + firstName + ", сервер не доступен! Попробуйте позже!</small></b>");
                        $('.success > .alert-danger', id).append('</div>');
                        //clear all fields
                        $(id + ' form').trigger("reset");
                    },
                })
            },
            filter: function() {
                return $(this).is(":visible");
            }
        });
    };

    get_subscrive("input, textarea", '#subscribe-form', 'Подписка в шапке');
    get_subscrive("input, textarea", '#subscribe1', 'Подписка в прайсе на индивидуальные заняти');
    get_subscrive("input, textarea", '#subscribe2', 'Подписка в прайсе на групповые заняти');
    get_subscrive("input, textarea", '#subscribe3', 'Подписка в прайсе на скайповые заняти');

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('.success').html('');
});
