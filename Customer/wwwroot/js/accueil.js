$(function () {
    //Fontion pour la validation des champs
    function validate(tag, type, message) {
        if (type == 'error') {
            tag.next().text(message).addClass('color-red');
            tag.addClass('border-red').removeClass('border-green');
        } else {
            tag.next().text('').removeClass('color-red');
            tag.addClass('border-green').removeClass('border-red');
        }
    }

    //Verification nombre du compte
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
                    if (res == false) {
                        validate($("#AccountNumber"), "error", "compte inexistant");
                    } else {
                        validate($("#AccountNumber"), "success", "");
                    }
                    
                }
            });
        }
    })

    //Validation du montant
    $("#AmountDisposit").on("blur", function (e) {
        e.preventDefault();
        //Valider si le champ est vide
        if ($(this).val() == "") {
            validate($("#AmountDisposit"), "error", "Champ obligatoire");
        } else {
            //Valider si le champ est valide
            if (/^-?(\d*\.)?\d*$/.test($("#AmountDisposit").val())) {
                validate($("#AmountDisposit"), "success", "");
            } else {
                validate($("#AmountDisposit"), "error", "Champ invalide");
            }
        }
    })

    //Validation après la click du sauvgarde
    $("#SubmitOperation").on("click", function (e) {
        e.preventDefault();
        let error = 0;
        //Valider si le champ est vide
        if ($("#AccountNumber").val() == "") {
            validate($("#AccountNumber"), "error", "Champ obligatoire");
            error++;
        } else {
            //Valider si le montant est < aux total du montant total
            $.ajax({
                type: "POST",
                url: "Client/VeritAccount?AccountNumber=" + $("#AccountNumber").val(),
                async: false,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res == false) {
                        validate($("#AccountNumber"), "error", "compte inexistant");
                        error++;
                    } else {
                        validate($("#AccountNumber"), "success", "");
                    }

                }
            });
        }
        //Valider si le champ est vide
        if ($("#AmountDisposit").val() == "") {
            validate($("#AmountDisposit"), "error", "Champ obligatoire");
            error++;
        } else {
            //Valider si le champ est valide
            if (/^-?(\d*\.)?\d*$/.test($("#AmountDisposit").val())) {
                validate($("#AmountDisposit"), "success", "");
            } else {
                validate($("#AmountDisposit"), "error", "Champ invalide");
                error++;
                
            }
        }
        if (error != 0) {
            return false;
        } else {
            $("#FormAddOperation").submit();
        }
    })

    //Validation montant à retirer
    $("#AmountWithdrawal").on("blur", function (e) {
        e.preventDefault();
        //Valider si le champ est vide
        if ($(this).val() == "") {
            validate($(this), "error", "Champ obligatoire");
        } else {
            //valider si le champ est valide
            if (!(/^-?(\d*\.)?\d*$/.test($("#AmountWithdrawal").val()))) {
                validate($(this), "error", "Champ invalide");
            } else {
                //Valider si le montant est correcte
                $.ajax({
                    type: "POST",
                    url: "Client/VeritAmount/?AccountNumber=" + $("#AccountNumber").val() + "&AmountWithdrawal=" + $("#Amount").val(),
                    async: false,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res == false) {
                            validate($("#AmountWithdrawal"), "error", "Solde insuffisant");
                        } else {
                            validate($("#AmountWithdrawal"), "success", "");
                        }

                    }
                });
            }
        }
    })

    //Bouton retrait montant
    $("#SubmitOperationWithdrawal").on("click", function (e) {
        e.preventDefault();
        let error = 0;
        //Verification nombre du compte
        if ($("#AccountNumber").val() == "") {
            //Valider si le champ est vide
            validate($("#AccountNumber"), "error", "Champ obligatoire");
            error++;
        } else {
            //Valider si le compte existe
            $.ajax({
                type: "POST",
                url: "Client/VeritAccount?AccountNumber=" + $("#AccountNumber").val(),
                async: false,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res == false) {
                        validate($("#AccountNumber"), "error", "compte inexistant");
                        error++;
                    } else {
                        validate($("#AccountNumber"), "success", "");
                    }

                }
            });
        }
        //Valider si le champ est vide
        if ($("#AmountWithdrawal").val() == "") {
            validate($("#AmountWithdrawal"), "error", "Champ obligatoire");
            error++;
        }
        else {
            //Valider si le montant est valide
            if (/^-?(\d*\.)?\d*$/.test($("#AmountWithdrawal").val())) {
                //valider si le montant est correcte
                $.ajax({
                    type: "POST",
                    url: "Client/VeritAmount/?AccountNumber=" + $("#AccountNumber").val() + "&Amount=" + $("#AmountWithdrawal").val(),
                    async: false,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res == false) {
                            validate($("#AmountWithdrawal"), "error", "Solde insuffisant");
                            error++;
                        } else {
                            validate($("#AmountWithdrawal"), "success", "");
                        }

                    }
                });
            } else {
                validate($("#AmountWithdrawal"), "error", "Champ invalide");
                error++;
                
            }
        }
        if (error != 0) {
            return false;
        } else {
            $("#FormAddOperationWithdrawal").submit();
        }
    })

    //Bouton retrait tous le montant
    $("#GetAllAmount").on("click", function (e) {
        e.preventDefault();
        let error = 0;
        if ($("#AccountNumber").val() == "") {
            validate($("#AccountNumber"), "error", "Champ obligatoire");
            error++;
        } else {
            $.ajax({
                type: "POST",
                url: "Client/VeritAccount?AccountNumber=" + $("#AccountNumber").val(),
                async: false,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res == false) {
                        validate($("#AccountNumber"), "error", "compte inexistant");
                        error++;
                    } else {
                        validate($("#AccountNumber"), "success", "");
                    }

                }
            });
        }
        if (error != 0) {
            return false;
        } else {
            $("#FormAddOperationWithdrawal").attr("action", "/Account/TakeAll");
        }
    })

    //Imprimer historique
    $("#PrintedHistorique").on("click", function (e) {
        e.preventDefault();
        let error = 0;
        if ($("#AccountNumber").val() == "") {
            validate($("#AccountNumber"), "error", "Champ obligatoire");
            error++;
        } else {
            $.ajax({
                type: "POST",
                url: "Client/VeritAccount?AccountNumber=" + $("#AccountNumber").val(),
                async: false,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res == false) {
                        validate($("#AccountNumber"), "error", "compte inexistant");
                        error++;
                    } else {
                        validate($("#AccountNumber"), "success", "");
                        window.location.href = "/Account/Printed?AccountNumber=" + $("#AccountNumber").val();
                    }
                }
            });
        }
    })
})