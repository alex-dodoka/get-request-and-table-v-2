const
    URL = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}',
    tableId = 'table_for_data',
    requestType = 'GET';

/*
 * Делаем ajax запрос
 * */
function getDataFromUrl() {
    $.ajax({
        url: URL, // здесь подставляешь урл на который хочешь сделать запрос
        type: requestType // здесь подставляешь тип запроса GET, POST, DELETE и т. д
    })
        .done((dataFromServer) => {
            //  прогоняем массив объектов в цикле и по очереди их отрисоваваем
            for (let i = 0; i < dataFromServer.length; i++) {
                let adress = dataFromServer[i].adress;
                let fullAddres = "";

                for (let addr in adress) {
                    fullAddres += adress[addr];
                }
                let html = drawData(dataFromServer[i], fullAddres);
                addHtml(tableId, html);

            }
        });
}

function drawData(modelData, home) {
    return '<tr class="row-table">' + // навешиваю класс на каждый ряд таблицы, что бы потом по этом классу можно было очисть всю таблицу
        '<td>' + modelData.id + '</td>' +
        '<td>' + modelData.firstName + '</td>' +
        '<td>' + modelData.lastName + '</td>' +
        '<td>' + modelData.email + '</td>' +
        '<td>' + modelData.phone + '</td>' +
        '<td>' + home + '</td>' +
        '<td>' + modelData.description + '</td>' +
        '</tr>'
}

function addHtml(id, data) {
    $("#" + id).append(data);
}

function clearTable(clazz) {
    $("." + clazz).html('');
}