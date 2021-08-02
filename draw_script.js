var objCanvas = null//obj qu representa o canvas e 
var objContexto = null//objeto que representa o contexto do canvas
var imgFundo = new Image()// cria uma nova imagem
imgFundo.src = "img/fundo.png"//atribui a imagem ao objeto instanciado
var imgPerson = new Image()
var imgVirus = new Image()
var imgPills = new Image()
var dx = 9; var dy = 9//velocidade dos objetos
var width = 512; var height = 480
var xPerson = 80; var yPerson = 190
var xVirus = 380; var yVirus = 200
var xPills; var yPills
var posicao = 1 // Sprite inicial do herói
var totalPosicao = 7  //Total de sprites do herói
var score = 0 
var posicaoVirus = 1 // Sprite inicial do vírus
var tpVirus = 3 // Total de sprites do vírus
var posicaoCorona = 1 // Sprite inicial do boss
var tpCorona = 4 // Total de posições do Boss
var i = 1 // Controla as vidas do herói
var nivel = 1 
var pontos = document.getElementById('divScore') // DIV que mostra a pontuação do personagem
var lvl = document.getElementById('divLevel') // DIV que mostra o nível do personagem
lvl.innerHTML = nivel
// Músicas e efeitos sonoros:
var musica1 = new sound("sound/bkmusic.mp3")
var musicaBoss = new sound("sound/musicaBoss.mp3")
var musicaVitoria = new sound("sound/musicaVitoria.mp3")
var levelUp = new sound("sound/levelUp.mp3")
var scoreUp = new sound("sound/scoreUp.mp3")
var gameOver = new sound("sound/gameover.mp3")
var hit = new sound("sound/hit.mp3")

function MovPerson(evt){//Controla movimentação do herói pelas setas
    switch (evt.keyCode) {
        case 37:  //Seta para esquerda
            if (xPerson + dx > 0){
                xPerson -= dx // Movimenta o personagem
                posicao++// Controla a troca dos sprites
                if(posicao == totalPosicao){// Se os sprites já acabaram, comece novamente
                    posicao = 1
                }  
            }
        break
        case 39:  //Seta para direita
            if (xPerson + dx < 460){
                xPerson += dx
                posicao++
                if(posicao == totalPosicao){
                    posicao = 1
                }  
            }
        break
        case 38: //Seta para cima
        if(yPerson + dy > 0){
            yPerson -= dy
            posicao++
            if(posicao == totalPosicao){
                posicao = 1
            }
        }
        break
        case 40: //Seta para baixo
        if(yPerson + dy < 430){
            yPerson += dy
            posicao++
            if(posicao == totalPosicao){
                posicao = 1
            }
        }
    }  
    AtualizarTela()
}

function Desenhar(){// Faz a troca de sprites    
    imgPerson.src = posicao + ".png";
}

function Pills(){// Faz as pílulas (meio de pontuação) aparecerem aleatóriamente
    var qualPill = parseInt((Math.random() * 10) % 4)
    switch(qualPill){// Escolhe com base no número sorteado qual imagem de pílula será mostrada
        case 0: imgPills.src = "img/cutePills.png"; break;
        case 1: imgPills.src = "img/pills2.png"; break;
        case 2: imgPills.src = "img/pills.png"; break;
    }
    xPills = 32 + (Math.random() * (width - 64))// Passa as coordenadas para as respectivas variáveis
    yPills = 32 + (Math.random() * (height - 64))
}

function MovVirus(){// Movimentação do vírus
    var direcao = parseInt((Math.random() * 10) % 4)//Sorteia um número aleátorio para a movimentação do vírus 
    switch (direcao){
        case 0://cima
            if(yVirus - dy > 10){
                yVirus -= dy + 10// Movimenta a vírus
            if(nivel == 1){// De acordo com nível, é mostrada um sprite de vírus
                imgVirus.src = "img/dengue" + posicaoVirus + ".png"
                posicaoVirus++// Controla os sprites do vírus
                if(posicaoVirus == tpVirus)// Caso chegue no limite de sprites, ele volta ao sprite inicial
                    posicaoVirus = 1
            }            
            else
            if(nivel == 2)
                imgVirus.src = "img/hiv" + posicaoVirus + ".png"
                posicaoVirus++
                if(posicaoVirus == tpVirus)
                    posicaoVirus = 1
            else
            if(nivel == 3){
                imgVirus.src = "img/coronaBoss" + posicaoCorona + ".png"
                posicaoCorona++
                if(posicaoCorona == tpCorona)
                    posicaoCorona = 1
            }
        }             
        break
        case 1://baixo
            if(yVirus + dy < height - 10){
                yVirus += dy + 10
                if(nivel == 1){
                    imgVirus.src = "img/dengue" + posicaoVirus + ".png"
                    posicaoVirus++
                    if(posicaoVirus == tpVirus)
                        posicaoVirus = 1
                }
            else
            if(nivel == 2){
                imgVirus.src = "img/hiv" + posicaoVirus + ".png"
                posicaoVirus++
                if(posicaoVirus == tpVirus)
                    posicaoVirus = 1
            }
            else
            if(nivel == 3){
                imgVirus.src = "img/coronaBoss" + posicaoCorona + ".png"
                posicaoCorona++
                if(posicaoCorona == tpCorona)
                    posicaoCorona = 1
            }
        }
        break
        case 2://esquerda
            if(xVirus - dx > 10){
                xVirus -= dx + 10
                if(nivel == 1){
                    imgVirus.src = "img/dengue" + posicaoVirus + ".png"
                    posicaoVirus++
                    if(posicaoVirus == tpVirus)
                        posicaoVirus = 1
                }
            else
            if(nivel == 2){
                imgVirus.src = "img/hiv" + posicaoVirus + ".png"
                posicaoVirus++
                if(posicaoVirus == tpVirus)
                    posicaoVirus = 1
            }
            else
            if(nivel == 3){
                imgVirus.src = "img/coronaBoss" + posicaoCorona + ".png"
                posicaoCorona++
                if(posicaoCorona == tpCorona)
                    posicaoCorona = 1
            }  
        }                    
        break
        case 3://direita
            if(xVirus + dx < width - 10){
                xVirus += dx + 10
                if(nivel == 1){
                    imgVirus.src = "img/dengue" + posicaoVirus + ".png"
                    posicaoVirus++
                    if(posicaoVirus == tpVirus)
                        posicaoVirus = 1
                }
            else
            if(nivel == 2){
                imgVirus.src = "img/hiv" + posicaoVirus + ".png"
                posicaoVirus++
                if(posicaoVirus == tpVirus)
                    posicaoVirus = 1
            }
            else
            if(nivel == 3){
                imgVirus.src = "img/coronaBoss" + posicaoCorona + ".png"
                posicaoCorona++
                if(posicaoCorona == tpCorona)
                    posicaoCorona = 1
            }
        }         
        break
    }  
}

function AtualizarTela(){
    objContexto.drawImage(imgFundo, 0, 0)
    objContexto.drawImage(imgPerson, xPerson, yPerson)
    objContexto.drawImage(imgVirus, xVirus, yVirus)
    objContexto.drawImage(imgPills, xPills, yPills)
    if(nivel == 1)// De acordo com nível, uma música de fundo é tocada
        musica1.play()
    else if(nivel == 3){
        musica1.stop()
        musicaBoss.play()
    }
    Desenhar()
    if(xPerson <= xVirus + 45 && xPerson >= xVirus - 35 && yPerson <= yVirus + 45 && yPerson >= yVirus - 35){// Se o herói e o vírus colidirem:
        if(i < 5){
            var vidas = document.getElementById('l' + i)
            vidas.src = "img/deadHeart.png"// O coração que representa a vida do personagem é substituído por uma imagem em branco dando a representação que o coração foi perdido
            i++
            hit.play()// Um som de dano é tocado
        }
        if(i == 5){// Caso o jogador elimine todas as suas vidas o jogo recomeça
            Reset()
        }
    }
    if(xPerson <= xPills+ 35 && xPerson >= xPills - 35 && yPerson <= yPills + 35 && yPerson >= yPills - 45){// Se o herói e a pílula colidirem:
        score += 5// Ganha 5 pontos por pílula
        pontos.innerHTML = score// A DIV que representa o score mostra a pontuação atual
        yPills = 1000000 // A pílula some
        scoreUp.play()// Um som de pontuação é tocado
        switch(score){// De acordo a pontuação o jogador vai subindo de nível, e quando isso ocorre um som é tocado
            case 25: nivel = 2; levelUp.play(); break;
            case 50: nivel = 3; levelUp.play(); break;
            case 100: nivel = 4; levelUp.play(); break;
        }
        lvl.innerHTML = nivel// A DIV que representa o nível mostra o nível atual do jogador
    }
    if(nivel == 4){// Se o jogador atingir o nível máximo, ou seja, ganhe o jogo:
        yPerson = 1000000 // O vírus e a herói somem
        xPerson = 1000000
        yVirus = 1000000
        yVirus = 1000000
        clearInterval(callVirus) // O vírus para de se movimentar
        clearInterval(callPill) // A pílula para de se movimentar
        musica1.stop() // As músicas de fundo param 
        musicaBoss.stop()
        musicaVitoria.play() // E a música da vitória é tocada
        objContexto.fillText('VOCE COMBATEU TODOS OS VIRUS E SALVOU O MUNDO!', 30, 250) //Uma mensagem de conclusão de jogo é mostrada ao jogador
    }
}

function Iniciar(){
    objCanvas = document.getElementById("meuCanvas")//pega o elemento html
    objContexto = objCanvas.getContext("2d")//coloca contexto no obj canvas
    objContexto.font = "15px slkscr"
    objContexto.drawImage(imgFundo, 0, 0) //1o param: imagem, 2o param: coord x, 3o param: coord y
    return setInterval(AtualizarTela, 100)// executa a função "AtualizarTela" a cada 100 milisegundos
}

function Reset(){ // Volta as configurações originais
    var xPerson = 80; var yPerson = 190 // O herói e o vírus voltam as posições originais
    var xVirus = 380; var yVirus = 200
    nivel = 1 // Nível volta ao inicial
    score = 0 // A pontuação é zerada
    pontos.innerHTML = score // As DIVs que mostram a pontuação e nível são atualizadas
    nivel.innerHTML = nivel 
    imgVirus.src = "img/dengue1.png"// O vírus volta a imagem inicial
    for(var j = 4; j >= 1; j--){ // As vidas são preenchidas de volta
        var vidas = document.getElementById('l' + j)
        vidas.src = "img/heart.png"
    }    
}

window.addEventListener('keydown', MovPerson)// Adiciona um evento para que o código das teclas sejam capturadas
var callVirus = window.setInterval(MovVirus, 100)// Chama a movimentação automática do vírus
var callPill = window.setInterval(Pills, 5000)// Chama o movimentação da pílula a cada 5 segundos

//Configurações de música - criado por W3Schools: https://www.w3schools.com/graphics/game_sound.asp
function sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}
