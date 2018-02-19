numMixADec()
function numMixADec() {
    let divCont = $('.oa11NumMix')
    divCont.find('input').change(function() {
        let numOp = parseInt(divCont.find('input').val())
        console.log(numOp)
        if (numOp === 7) {
            return false
        } else {
            divCont.find('#numMixRespCor').append(function() {
                let denomOp = parseInt($('#denominadorMixto').text())
                console.log(denomOp)
                return numOp/denomOp
            });
            divCont.find('#numMixRespInc1').append(function() {
                return '10.' + numOp
            })
            divCont.find('#numMixRespInc2').append(function() {
                return numOp + '.0'
            })
            divCont.find('#numMixRespInc3').append(function() {
                return '0.' + numOp + '1'
            })
        }
    })
}

numDecSumPeso()

// numero random (Math.random() * (a - b) + b).toFixed(c) a = num máx, b = num min, c = cantidad de decimales

function numDecSumPeso() {
    let numLetra = ['Cero', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve']
}

function rangoNumAleatorioDec(min, max, cantDec) {
    return (Math.random() * (max - min) + min).toFixed(cantDec)
}