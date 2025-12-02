// 데이터
var hiragana = [
    {kana: 'あ', roma: '아'}, {kana: 'い', roma: '이'}, {kana: 'う', roma: '우'},
    {kana: 'え', roma: '에'}, {kana: 'お', roma: '오'}, {kana: 'か', roma: '카'},
    {kana: 'き', roma: '키'}, {kana: 'く', roma: '쿠'}, {kana: 'け', roma: '케'},
    {kana: 'こ', roma: '코'}, {kana: 'さ', roma: '사'}, {kana: 'し', roma: '시'},
    {kana: 'す', roma: '스'}, {kana: 'せ', roma: '세'}, {kana: 'そ', roma: '소'},
    {kana: 'た', roma: '타'}, {kana: 'ち', roma: '치'}, {kana: 'つ', roma: '츠'},
    {kana: 'て', roma: '테'}, {kana: 'と', roma: '토'}, {kana: 'な', roma: '나'},
    {kana: 'に', roma: '니'}, {kana: 'ぬ', roma: '누'}, {kana: 'ね', roma: '네'},
    {kana: 'の', roma: '노'}, {kana: 'は', roma: '하'}, {kana: 'ひ', roma: '히'},
    {kana: 'ふ', roma: '후'}, {kana: 'へ', roma: '헤'}, {kana: 'ほ', roma: '호'},
    {kana: 'ま', roma: '마'}, {kana: 'み', roma: '미'}, {kana: 'む', roma: '무'},
    {kana: 'め', roma: '메'}, {kana: 'も', roma: '모'}, {kana: 'や', roma: '야'},
    {kana: 'ゆ', roma: '유'}, {kana: 'よ', roma: '요'}, {kana: 'ら', roma: '라'},
    {kana: 'り', roma: '리'}, {kana: 'る', roma: '루'}, {kana: 'れ', roma: '레'},
    {kana: 'ろ', roma: '로'}, {kana: 'わ', roma: '와'}, {kana: 'を', roma: '오'},
    {kana: 'ん', roma: '응'}
];

var katakana = [
    {kana: 'ア', roma: '아'}, {kana: 'イ', roma: '이'}, {kana: 'ウ', roma: '우'},
    {kana: 'エ', roma: '에'}, {kana: 'オ', roma: '오'}, {kana: 'カ', roma: '카'},
    {kana: 'キ', roma: '키'}, {kana: 'ク', roma: '쿠'}, {kana: 'ケ', roma: '케'},
    {kana: 'コ', roma: '코'}, {kana: 'サ', roma: '사'}, {kana: 'シ', roma: '시'},
    {kana: 'ス', roma: '스'}, {kana: 'セ', roma: '세'}, {kana: 'ソ', roma: '소'},
    {kana: 'タ', roma: '타'}, {kana: 'チ', roma: '치'}, {kana: 'ツ', roma: '츠'},
    {kana: 'テ', roma: '테'}, {kana: 'ト', roma: '토'}, {kana: 'ナ', roma: '나'},
    {kana: 'ニ', roma: '니'}, {kana: 'ヌ', roma: '누'}, {kana: 'ネ', roma: '네'},
    {kana: 'ノ', roma: '노'}, {kana: 'ハ', roma: '하'}, {kana: 'ヒ', roma: '히'},
    {kana: 'フ', roma: '후'}, {kana: 'ヘ', roma: '헤'}, {kana: 'ホ', roma: '호'},
    {kana: 'マ', roma: '마'}, {kana: 'ミ', roma: '미'}, {kana: 'ム', roma: '무'},
    {kana: 'メ', roma: '메'}, {kana: 'モ', roma: '모'}, {kana: 'ヤ', roma: '야'},
    {kana: 'ユ', roma: '유'}, {kana: 'ヨ', roma: '요'}, {kana: 'ラ', roma: '라'},
    {kana: 'リ', roma: '리'}, {kana: 'ル', roma: '루'}, {kana: 'レ', roma: '레'},
    {kana: 'ロ', roma: '로'}, {kana: 'ワ', roma: '와'}, {kana: 'ヲ', roma: '오'},
    {kana: 'ン', roma: '응'}
];

var type = 'hiragana';
var questions = [];
var current = 0;
var score = 0;

//실행
document.addEventListener('DOMContentLoaded', function() {
    // 모달 열기
    document.getElementById('openQuizBtn').onclick = function() {
        document.getElementById('quizModal').classList.add('show');
        document.getElementById('quizSetup').style.display = 'block';
        document.getElementById('quizPlay').style.display = 'none';
        document.getElementById('quizResult').style.display = 'none';
    };

    // 모달 닫기
    document.getElementById('quizModal').onclick = function(e) {
        if (e.target.id === 'quizModal') {
            document.getElementById('quizModal').classList.remove('show');
        }
    };

    // 타입 선택
    var typeBtns = document.querySelectorAll('[data-type]');
    for (var i = 0; i < typeBtns.length; i++) {
        typeBtns[i].onclick = function() {
            for (var j = 0; j < typeBtns.length; j++) {
                typeBtns[j].setAttribute('aria-pressed', 'false');
            }
            this.setAttribute('aria-pressed', 'true');
            type = this.getAttribute('data-type');
        };
    }

    // 시작
    document.getElementById('startQuizBtn').onclick = function() {
        var data = type === 'hiragana' ? hiragana : katakana;
        questions = [];
        for (var i = 0; i < 5; i++) {
            var rand = Math.floor(Math.random() * data.length);
            questions.push(data[rand]);
        }
        current = 0;
        score = 0;

        document.getElementById('quizSetup').style.display = 'none';
        document.getElementById('quizPlay').style.display = 'block';
        showQuestion();
    };

    // 닫기
    document.getElementById('closeQuizBtn').onclick = function() {
        document.getElementById('quizModal').classList.remove('show');
    };

    // Enter 키로 제출
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            var quizPlay = document.getElementById('quizPlay');
            if (quizPlay.style.display !== 'none') {
                checkAnswer();
            }
        }
    });
});

function showQuestion() {
    var q = questions[current];

    document.getElementById('quizCharacter').textContent = q.kana;
    document.getElementById('currentQuestion').textContent = current + 1;

    // 입력창 초기화
    var input = document.getElementById('answerInput');
    input.value = '';
    input.disabled = false;
    input.focus();

    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('submitBtn').disabled = false;
}

function checkAnswer() {
    var userAnswer = document.getElementById('answerInput').value.trim();
    var correct = questions[current].roma;

    // 입력이 비어있으면 체크 안 함
    if (!userAnswer) {
        return;
    }

    // 정답 체크
    var isCorrect = userAnswer === correct;
    if (isCorrect) {
        score++;
    }

    // 입력창과 제출 버튼 비활성화
    document.getElementById('answerInput').disabled = true;
    document.getElementById('submitBtn').disabled = true;

    // 피드백 표시
    var feedback = document.getElementById('quizFeedback');
    feedback.style.display = 'block';
    feedback.className = isCorrect ? 'quiz-feedback correct' : 'quiz-feedback incorrect';
    document.getElementById('feedbackText').textContent = isCorrect ? '정답!' : '오답! 정답: ' + correct;

    // 1초 후 다음 문제
    setTimeout(function() {
        current++;
        if (current < 5) {
            showQuestion();
        } else {
            showResult();
        }
    }, 500);
}

function showResult() {
    document.getElementById('quizPlay').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('correctCount').textContent = score;
}
