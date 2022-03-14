$(function () {
    //fonction pour la validation des champs
    function validate(tag, type, message) {
        if (type == 'error') {
            tag.next().text(message).addClass('color-red');
            tag.addClass('border-red').removeClass('border-green');
        } else {
            tag.next().text('').removeClass('color-red');
            tag.addClass('border-green').removeClass('border-red');
        }
    }

    //validation Nom du client
    $("#NameCustomer").on("blur", function (e) {
        e.preventDefault();
        //Valider si le champ est vide
        if ($(this).val() == "") {
            validate($(this), "error", "Champ obligatoire");
        } else {
            validate($(this), "success", "");
        }
    })

    //Validation numéro compte
    $("#AccountNumber").on("blur", function (e) {
        e.preventDefault();
        //Valider si le champ est vide
        if ($(this).val() == "") {
            validate($(this), "error", "Champ obligatoire");
        } else {
            //Valider si le numéro est valide
            $.ajax({
                type: "POST",
                url: "Client/VeritAccount?AccountNumber=" + $("#AccountNumber").val(),
                async: false,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res == true) {
                        validate($("#AccountNumber"), "error", "Choisir une autre");
                    } else {
                        validate($("#AccountNumber"), "success", "");
                    }
                }
            });
        }
    })

    //Validation du montant
    $("#TotalAmount").on("blur", function (e) {
        e.preventDefault();
        //Valider si le champ est vide
        if ($(this).val() == "") {
            validate($("#TotalAmount"), "error", "Champ obligatoire");
        } else {
            //Valider si le champ est valide
            if (/^-?(\d*\.)?\d*$/.test($("#TotalAmount").val())) {
                validate($("#TotalAmount"), "success", "");
            } else {
                validate($("#TotalAmount"), "error", "Champ invalide");
            }
        }
    })

    $("#AddCustomer").on("click", function (e) {
        e.preventDefault();
        let error = 0;
        //Valider si le champ est vide
        if ($("#NameCustomer").val() == "") {
            validate($("#NameCustomer"), "error", "Champ obligatoire");
            error++;
        } else {
            validate($("#NameCustomer"), "success", "");
        }

        //Valider si le champ est vide
        if ($("#AccountNumber").val() == "") {
            validate($("#AccountNumber"), "error", "Champ obligatoire");
            error++;
        } else {
            //Valider si le numéro est valide
            $.ajax({
                type: "POST",
                url: "Client/VeritAccount?AccountNumber=" + $("#AccountNumber").val(),
                async: false,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res == true) {
                        validate($("#AccountNumber"), "error", "Choisir une autre");
                        error++;
                    } else {
                        validate($("#AccountNumber"), "success", "");
                    }
                }
            });
        }

        //Validation du montant
        if ($("#TotalAmount").val() == "") {
            validate($("#TotalAmount"), "error", "Champ obligatoire");
            error++;
        } else {
            //Valider si le champ est valide
            if (/^-?(\d*\.)?\d*$/.test($("#TotalAmount").val())) {
                validate($("#TotalAmount"), "success", "");
            } else {
                validate($("#TotalAmount"), "error", "Champ invalide");
                error++;
            }
        }

        if (error != 0) {
            return false;
        } else {
            $("#FormAddCustomer").submit();
        }
    })
})