// 모달 관련 스크립트
function initModal() {
    var modal = document.getElementById('strokeModal');
    var spriteFrames = document.querySelectorAll('.sprite-frame');
    var cards = document.querySelectorAll('.card:not(.empty)');
    var currentFrame = 0;
    var maxFrames = 0;
    var timer = null;

    // 카드 클릭시 모달 열기
    for (var i = 0; i < cards.length; i++) {
        cards[i].onclick = function() {
            var roma = this.querySelector('.roma').textContent;
            var imgUrl = '/hiragana-strokes/' + roma + '.png';

            // 이미지 로드해서 크기 확인
            var img = new Image();
            img.onload = function() {
                maxFrames = Math.round(img.width / 114);

                // 모든 프레임 초기화
                for (var k = 0; k < spriteFrames.length; k++) {
                    spriteFrames[k].style.backgroundImage = 'url(' + imgUrl + ')';
                    spriteFrames[k].style.opacity = '0';
                }

                // 애니메이션 시작
                currentFrame = 0;
                if (timer) clearInterval(timer);

                timer = setInterval(function() {
                    if (currentFrame < maxFrames) {
                        spriteFrames[currentFrame].style.opacity = '1';
                        currentFrame++;
                    } else {
                        currentFrame = 0;
                        for (var j = 0; j < maxFrames; j++) {
                            spriteFrames[j].style.opacity = '0';
                        }
                    }
                }, 600);

                modal.classList.add('show');
            };

            img.src = imgUrl;
        };
    }

    // 모달 닫기
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            if (timer) clearInterval(timer);
        }
    };
}

