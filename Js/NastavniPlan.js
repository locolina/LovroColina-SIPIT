$(document).ready(function () {
    const bearerToken = localStorage.getItem("token");
    let data;

    $(".form-control").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: 'https://www.fulek.com/data/api/supit/curriculum-list/hr',
                type: 'GET',
                dataType: 'json',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`
                },
                success: function (responseData) {
                    data = responseData;
                    const searchTerm = request.term.toLowerCase();
                    const filteredData = data.data.filter(function (item) {
                        return item.kolegij.toLowerCase().includes(searchTerm);
                    });
                    const autoCompleteResults = filteredData.map(function (item) {
                        return item.kolegij;
                    });
                    response(autoCompleteResults);
                },
                error: function (xhr, status, error) {
                    console.error('Error fetching data: ' + error);
                }
            });
        },
        select: function (event, ui) {
            const selectedCourse = ui.item.value;
            const matchingItem = data.data.find(function (item) {
                return item.kolegij === selectedCourse;
            });

            if (matchingItem) {
                $('#tablicaKolegijaBody').append(
                    '<tr>' +
                    '<td>' + matchingItem.kolegij + '</td>' +
                    '<td>' + matchingItem.ects + '</td>' +
                    '<td>' + matchingItem.sati + '</td>' +
                    '<td>' + matchingItem.predavanja + '</td>' +
                    '<td>' + matchingItem.vjezbe + '</td>' +
                    '<td>' + matchingItem.tip + '</td>' +
                    '<td><button type="button" class="btn btn-danger">Remove</button></td>' +
                    '</tr>'
                );
                updateTotals();
            }

            $(this).val('');
            return false;
        }
    });

    function updateTotals() {
        let totalECTS = 0;
        let totalSati = 0;
        let totalPredavanja = 0;
        let totalVjezbe = 0;

        $('#tablicaKolegijaBody tr').each(function () {
            const row = $(this);
            totalECTS += parseFloat(row.find('td:eq(1)').text());
            totalSati += parseFloat(row.find('td:eq(2)').text());
            totalPredavanja += parseFloat(row.find('td:eq(3)').text());
            totalVjezbe += parseFloat(row.find('td:eq(4)').text());
        });

        $('#ukupniECTS').text(totalECTS);
        $('#ukupniSati').text(totalSati);
        $('#ukupniPredavanja').text(totalPredavanja);
        $('#ukupniVjezbe').text(totalVjezbe);
    }

    $('#tablicaKolegijaBody').on('click', '.btn', function () {
        $(this).closest('tr').remove();
        updateTotals();
    });
});
