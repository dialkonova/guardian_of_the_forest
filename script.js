let player = document.getElementById('player');
let playerPosition = {x: 750, y: 450}; // Початкова позиція гг
let game = document.querySelector('.game');
let scene = 1;
let backgrounds = ['./images/bg.jpg', './images/bg_2.jpg'];
let images = {
    forward: "./images/char_1_back.png",
    backward: "./images/char_1.png",
    right: "./images/char_1_right.png",
    left: "./images/char_1_left.png"
};

let buttonInt = document.querySelector('.button_int');
let diaWindow = document.querySelector('.dia_window_1');
let diaWindow2 = document.querySelector('.dia_window_2'); 
let diaWindow3; 
let chIncorrect = document.querySelector('.ch_1incorrect');
let chCorrect = document.querySelector('.ch_1correct');
let buttonNext = document.querySelector('.button_next');
let buttonSpeak = document.querySelector('.button_speak');
let player2 = document.getElementById('player2');
let testImage = document.querySelector('.test img'); 
let fireplaceImage = document.querySelector('.fireplace');

// Приховування персонажа, кнопки, діалогові вікна та зображеннь
player2.style.display = 'none';
buttonInt.style.display = 'none';
diaWindow.style.display = 'none';
diaWindow2.style.display = 'none';
chIncorrect.style.display = 'none';
chCorrect.style.display = 'none';
buttonSpeak.style.display = 'none';
testImage.style.display = 'none';
mini_game.style.display = 'none';

// Функція для визначення відстані між двома точками (персонажем і об'єктом)
function calculateDistance(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
    const dx = (rect1.x + rect1.width / 2) - (rect2.x + rect2.width / 2);
    const dy = (rect1.y + rect1.height / 2) - (rect2.y + rect2.height / 2);
    return Math.sqrt(dx * dx + dy * dy);
}

// Функція, що перевіряє відстань і встановлює видимість кнопок
function checkProximity() {
    const distance = calculateDistance(player, fireplaceImage);
    if (distance < 200) { 
        buttonInt.style.display = 'block';
    } else {
        buttonInt.style.display = 'none';
    }
}

// Функція, що додає другого персонажа при зміні фону
function addSecondCharacter() {
    player2.style.display = 'block'; // Показуємо другого персонажа
}

// Функція, що приховує другого персонажа при зміні фону
function hideSecondCharacter() {
    player2.style.display = 'none'; // Приховвання другого персонажа
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'w':
            playerPosition.y -= 10;
            changeCharacterImage('w');
            break;
        case 's':
            playerPosition.y += 10;
            changeCharacterImage('s');
            break;
        case 'a':
            playerPosition.x -= 10;
            changeCharacterImage('a');
            if (playerPosition.x < -50) {
                changeScene();
            }
            break;
        case 'd':
            playerPosition.x += 10;
            changeCharacterImage('d');
            break;
    }

    player.style.left = playerPosition.x + 'px'; 
    player.style.top = playerPosition.y + 'px';

    
    checkProximity();
});

// Змінюємо зображення персонажа в залежності від напрямку
function changeCharacterImage(direction) {
    let foot = (direction === 'w' || direction === 's') ? 'left' : 'right'; 
    switch (direction) {
        case 'w': // Вперед
            player.innerHTML = `<img src="${images.forward}" alt="">`;
            break;
        case 's': // Назад
            player.innerHTML = `<img src="${images.backward}" alt="">`;
            break;
        case 'a': // Вліво
            player.innerHTML = `<img src="${images.left}" alt="">`;
            break;
        case 'd': // Вправо
            player.innerHTML = `<img src="${images.right}" alt="">`;
            break;
    }
}

// Зміна сцени (фону) гри
function changeScene() {
    scene++;
    if (scene > backgrounds.length) {
        scene = 1;
    }
    game.style.backgroundImage = `url(${backgrounds[scene - 1]})`;
    playerPosition.x = 50; // Початкова позиція гравця при зміні сцени
    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';
    if (scene === 2) {
        document.body.style.backgroundImage = `url(${backgrounds[scene - 1]})`;
        addSecondCharacter(); 
    } else {
        hideSecondCharacter(); 
    }
}

// Кнопка button_int
buttonInt.addEventListener('click', function() {
    // Показуємо діалогове вікно з кнопками вибору
    diaWindow.style.display = 'block';
    // Показуємо кнопки вибору після відображення діалогового вікна
    chIncorrect.style.display = 'block';
    chCorrect.style.display = 'block';
    // Приховуємо кнопку button_int
    buttonInt.style.display = 'none';
});

// Вибори у діалоговому вікні
chIncorrect.addEventListener('click', function() {
    alert("Ви обрали неправильний варіант. Якщо не загасити багаття, то воно може швидко перетворитися в лісову пожежу, що призведе до знищення дикої природи, втрати житлових масивів та загрози життю та безпеці тварин та людей.");
});

chCorrect.addEventListener('click', function() {
    alert("Ви обрали правильний варіант. Багаття в лісі може спричинити небезпеку пожежі, що може призвести до серйозних наслідків, таких як втрата лісових масивів, пошкодження дикої природи та загроза для життя людей, тому завжди вірним варіантом буде - загасити багаття");
    diaWindow.style.display = 'none'; // Приховуємо діалогове вікно після правильного вибору
    chIncorrect.style.display = 'none'; // Приховуємо кнопку "Неправильний вибір"
    chCorrect.style.display = 'none'; // Приховуємо кнопку "Правильний вибір"
});

// Кнопка button_next
buttonNext.addEventListener('click', function() {
    // Змінюємо фон сторінки на bg_2.jpg
    document.body.style.backgroundImage = `url(${backgrounds[1]})`;

    // Показуємо кнопку buttonSpeak після натискання на кнопку button_next
    buttonSpeak.style.display = 'block';

    // Приховуємо кнопку button_next після натискання на неї
    buttonNext.style.display = 'none';

    // Приховуємо діалогове вікно
    diaWindow.style.display = 'none';

    // Приховуємо кнопку button_int
    buttonInt.style.display = 'none';

    // Приховуємо об'єкт fireplace
    fireplaceImage.style.display = 'none';

    // Переміщуємо персонажа з правого краю сторінки
    playerPosition.x = window.innerWidth - 150; 
    playerPosition.y = 450; 
    player.style.left = playerPosition.x + 'px'; 
    player.style.top = playerPosition.y + 'px';

    // Додаємо другого персонажа після зміни фону
    addSecondCharacter();
});

// Кнопка button_speak
buttonSpeak.addEventListener('click', function() {
    // Показуємо діалогове вікно 2 після натискання на кнопку button_speak
    diaWindow2.style.display = 'block';
});

// Кліку на dia_window_2
diaWindow2.addEventListener('click', function() {
    // Приховуємо діалогове вікно 2 і кнопку button_speak
    diaWindow2.style.display = 'none';
    buttonSpeak.style.display = 'none';

    // Приховуємо man.png
    player2.style.display = 'none';

    // Показуємо нове діалогове вікно dia_window_3
    diaWindow3 = document.createElement('div');
    diaWindow3.className = 'dia_window_3';
    diaWindow3.innerHTML = '<img src="./images/dia_window_3.png" alt="">';
    document.body.appendChild(diaWindow3);

    // Клік на dia_window_3
    diaWindow3.addEventListener('click', function() {
        // Приховуємо діалогове вікно 3
        diaWindow3.style.display = 'none';

        // Показуємо зображення test
        testImage.style.display = 'block';

        // Змінюємо зображення в diaWindow3 на test.png
        diaWindow3.innerHTML = '<img src="./images/test.png" alt="">';
    });
});

// Додаємо обробник подій для кнопки dia_1ch_correct.png
let correctButton = document.querySelector('.ch_1correct');
correctButton.addEventListener('click', function() {
    // Змінюємо зображення fireplace.png на fireplace_2.png
    fireplaceImage.src = './images/fireplace_2.png';
});

// Кнопка test
let buttonTest = document.querySelector('.test img');

buttonTest.addEventListener('click', function() {
    // Показуємо тестове вікно після натискання на кнопку "Тест"
    let testWindow = document.createElement('div');
    testWindow.className = 'test-window';
    testWindow.id="test";
    testWindow.innerHTML = `
        <div class="test-content">
            <h2>Тест хранителя лісової екології</h2>
            <div class="question">
            <div class="options">
            <p>♥Які заходи можуть допомогти зберегти лісові масиви?</p>
                    <div class="option">
                        <input type="radio" id="option1" name="question1" value="a">
                        <label for="option1">а) Вирубування всіх дерев у лісі.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option2" name="question1" value="b">
                        <label for="option2">б) Створення національних парків і заповідників.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option3" name="question1" value="c">
                        <label for="option3">в) Заборона в'їзду в ліс всім видам транспорту.</label>
                    </div>
                </div>
            </div>
            <div class="options">
            <p>♥Яке з нижченаведених забруднень є основною загрозою для лісів?
            ?</p>
                    <div class="option">
                        <input type="radio" id="option1" name="question2" value="a">
                        <label for="option1">а) Викиди парникових газів.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option2" name="question2" value="b">
                        <label for="option2">б) СВикористання екологічно чистих технологій.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option3" name="question2" value="c">
                        <label for="option3">в) Заборона паління в лісі.</label>
                    </div>
                </div>
                <div class="options">
            <p>♥Які види діяльності сприяють лісозаготівлі без шкоди для довкілля?
            </p>
                    <div class="option">
                        <input type="radio" id="option1" name="question3" value="a">
                        <label for="option1">а) Необмежене вирубування дерев.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option2" name="question3" value="b">
                        <label for="option2">б) Впровадження лісового господарства з відновлення лісових ресурсів.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option3" name="question3" value="c">
                        <label for="option3">в) Викидання сміття в лісі.</label>
                    </div>
                </div>
            </div>
            <div class="options">
            <p>♥Яка з наступних проблем загрожує біорізноманіттю лісів?
            </p>
                    <div class="option">
                        <input type="radio" id="option1" name="question4" value="a">
                        <label for="option1">а) Зменшення кількості дикоросів.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option2" name="question4" value="b">
                        <label for="option2">б) Збільшення площі лісових масивів.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option3" name="question4" value="c">
                        <label for="option3">в) Створення нових лісосік.</label>
                    </div>
                </div>
                <div class="options">
            <p>♥Яке з наведених нижче зрізання лісів є найбільш небезпечним для екосистем?
            </p>
                    <div class="option">
                        <input type="radio" id="option1" name="question5" value="a">
                        <label for="option1">а) Вирубування зелених насаджень для будівництва парковки.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option2" name="question5" value="b">
                        <label for="option2">б) Вибіркове вирубування лише старих дерев.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option3" name="question5" value="c">
                        <label for="option3">в)Посідання земель для розширення лісових масивів.</label>
                    </div>
                </div>
                <div class="options">
            <p>♥Які з наступних дій можуть допомогти зберегти лісові масиви?</p>
                    <div class="option">
                        <input type="radio" id="option1" name="question6" value="a">
                        <label for="option1">а) Заборона відвідування лісу для туризму.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option2" name="question6" value="b">
                        <label for="option2">б) Збереження природних середовищ та відновлення втрачених екосистем.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option3" name="question6" value="c">
                        <label for="option3">в) Лісосіки для створення нових зелених зон у місті.</label>
                    </div>
                </div>
            </div>
            <div class="options">
            <p>♥Які з наступних дій можуть допомогти зменшити загрозу лісовим пожежам?
            ?</p>
                    <div class="option">
                        <input type="radio" id="option1" name="question7" value="a">
                        <label for="option1">а)  Вибіркова вирубка лише поживних дерев.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option2" name="question7" value="b">
                        <label for="option2">б)Впровадження системи раннього виявлення пожеж.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option3" name="question7" value="c">
                        <label for="option3">в) Викидання сміття у ліс.</label>
                    </div>
                </div>
                <div class="options">
            <p>♥Що є головною загрозою для лісового ґрунту?
            </p>
                    <div class="option">
                        <input type="radio" id="option1" name="question8" value="a">
                        <label for="option1">а)Надмірна вологість.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option2" name="question8" value="b">
                        <label for="option2">б) Забруднення ґрунту хімічними речовинами.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option3" name="question8" value="c">
                        <label for="option3">в) Велика кількість осінніх опадів.</label>
                    </div>
                </div>
            </div>
            <div class="options">
            <p>♥Які види діяльності можуть допомогти зберегти біорізноманіття лісу?

            </p>
                    <div class="option">
                        <input type="radio" id="option1" name="question9" value="a">
                        <label for="option1">а) Невибіркове вирубування всіх дерев.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option2" name="question9" value="b">
                        <label for="option2">б) Створення екологічних коридорів між лісовими масивами.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option3" name="question9" value="c">
                        <label for="option3">в) Викидання сміття у лісові масиви.</label>
                    </div>
                </div>
                <div class="options">
            <p>♥Які з нижченаведених заходів можуть допомогти зберегти водні ресурси лісів?
            </p>
                    <div class="option">
                        <input type="radio" id="option1" name="question10" value="a">
                        <label for="option1">а) Руйнування природних водосховищ.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option2" name="question10" value="b">
                        <label for="option2">б) Відновлення берегів річок та створення зон відпочинку.</label>
                    </div>
                    <div class="option">
                        <input type="radio" id="option3" name="question10" value="c">
                        <label for="option3">в)Виливання токсичних речовин у річки та озера.</label>
                    </div>
                </div>
            <button onclick="checkTest()">Перевірити</button>
        </div>
    `;
    document.body.appendChild(testWindow);
    // Приховуємо кнопку test після натискання на неї
    buttonTest.style.display = 'none';
});

// Функція для перевірки відповідей на тест
function checkTest() {
    // Отримуємо всі вибрані відповіді
    let selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
    let correctAnswers = 0; // лічильник правильних відповідей
    // Перевіряємо кожну вибрану відповідь
    selectedOptions.forEach(function(option) {
        let questionNumber = option.name.charAt(option.name.length - 1); // отримуємо номер питання
        let correctOption = getCorrectOption(questionNumber); // отримуємо правильну відповідь
        if (option.value === correctOption) {
            correctAnswers++; 
        }
    });
    // Показуємо повідомлення з результатами тесту
    alert(`Ви дали ${correctAnswers} правильних відповідей з ${selectedOptions.length} питань.`);
    // Прибираємо вікно тесту з екрану
    document.querySelector('.test-window').remove();
    // Показуємо кнопку test після завершення тесту
    buttonTest.style.display = 'block';
}


function getCorrectOption(questionNumber) {
    switch (questionNumber) {
        case '1':
            return 'b'; // правильна відповідь на перше питання
        case '2':
            return 'a'; // правильна відповідь на друге питання і тд
        case '3':
            return 'b';
        case '4':
            return 'a';
        case '5':
            return 'a';
        case '6':
                return 'b'; 
        case '7':
                return 'b'; 
        case '8':
                return 'b';
        case '9':
                return 'b';
        case '10':
                return 'b';

        default:
            return '0'; 
    }
}
// Функція для перевірки результату тесту та подальших дій
function checkTest() {
    // Отримуємо всі вибрані відповіді
    let selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
    let correctAnswers = 0; // лічильник правильних відповідей
    // Перевіряємо кожну вибрану відповідь
    selectedOptions.forEach(function(option) {
        let questionNumber = option.name.charAt(option.name.length - 1); // отримуємо номер питання
        let correctOption = getCorrectOption(questionNumber); // отримуємо правильну відповідь
        if (option.value === correctOption) {
            correctAnswers++; // збільшуємо лічильник, якщо відповідь правильна
        }
    });

    // Показуємо повідомлення з результатами тесту
    alert(`Ви дали ${correctAnswers} правильних відповідей з ${selectedOptions.length} питань.`);

    // Перевіряємо результат тесту та виконуємо відповідні дії
    if (correctAnswers < 7) {
        // Якщо результат менше 7, пропонуємо користувачеві пройти тест ще раз
        let retry = confirm("Ви не набрали достатньо балів. Бажаєте спробувати знову?");
        if (retry) {
            // Прибираємо вікно тесту з екрану
            document.querySelector('.test-window').remove();
            // Показуємо кнопку test після завершення тесту
            buttonTest.style.display = 'block';
        }
    } else {
        // Якщо результат 7 або більше, приховуємо кнопку test та зображення test.png
        buttonTest.style.display = 'none';
        testImage.style.display = 'none';
        test.style.display = 'none';
        mini_game.style.display = 'block';
    }
}

checkProximity();

const piggy = document.getElementById("piggy");
const grib = document.getElementById("grib");
let isJumping = false;

document.addEventListener("keydown", function(event) {
    if (!isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    if (!piggy.classList.contains("jump")) {
        piggy.classList.add("jump");
    }
    setTimeout(function() {
        piggy.classList.remove("jump");
        isJumping = false;
    }, 500);
}

let isalive = setInterval(function rungame() {
    let piggyTop = parseInt(window.getComputedStyle(piggy).getPropertyValue("top"));
    let piggyLeft = parseInt(window.getComputedStyle(piggy).getPropertyValue("left"));
    let gribLeft = parseInt(window.getComputedStyle(grib).getPropertyValue("left"));

    
    if (!isJumping && Math.abs(piggyLeft - gribLeft) < 50 && piggyTop >= 120) {
        clearInterval(isalive);
        let answer = confirm("GAME OVER. Start again?");
        if (answer==true){
           isalive = setInterval(rungame, 100); 
        }
        else {
            mini_game.style.display = 'none';
            let msg = document.createElement('div');
            msg.innerHTML = '<p>Хочете почати заново? Обновіть сторінку(натисніть F5)</p>';
            msg.style.fontSize = '2rem';
            msg.style.color = 'rgb(165, 238, 169)';
            msg.style.position = 'absolute';
            msg.style.top = '50%';
            msg.style.left = '30%';
            msg.style.border = '5px solid rgb(5, 50, 5)'
            msg.style.zIndex ='3200';
            msg.style.backgroundColor = 'rgb(29, 77, 57)';
            msg.style.padding = '5px';
            document.body.appendChild(msg);
            
        }
        
        
    }
}, 100);