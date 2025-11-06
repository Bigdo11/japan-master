// 모달 관련 스크립트
function initModal() {
    var modal = document.getElementById('strokeModal');
    var spriteFrames = document.querySelectorAll('.sprite-frame');

    // 카드 클릭시 모달 열기
    var cards = document.querySelectorAll('.card:not(.empty)');

    for (var i = 0; i < cards.length; i++) {
        cards[i].onclick = function() {
            var roma = this.querySelector('.roma').textContent;
            var imgUrl = '/hiragana-strokes/' + roma + '.png';

            // 이미지 로드해서 크기 확인
            var testImg = new Image();
            testImg.onload = function() {
                var frameCount = Math.round(testImg.width / 114);

                // 모든 프레임 초기화 및 숨기기
                for (var k = 0; k < spriteFrames.length; k++) {
                    spriteFrames[k].style.display = 'none';
                    spriteFrames[k].style.animation = 'none';
                    spriteFrames[k].style.opacity = '0';
                }

                // 필요한 프레임만 표시하고 이미지 설정
                var percentage = 100 / frameCount;
                for (var j = 0; j < frameCount; j++) {
                    if (spriteFrames[j]) {
                        spriteFrames[j].style.display = 'block';
                        spriteFrames[j].style.backgroundImage = 'url(' + imgUrl + ')';

                        // 동적 애니메이션 생성
                        var startPercent = (percentage * j).toFixed(2);
                        var animationName = 'showFrame' + (j + 1) + '-' + frameCount;

                        // keyframe 생성 및 적용
                        var keyframes = '@keyframes ' + animationName + ' {' +
                            '0%, ' + (startPercent - 0.01) + '% { opacity: 0; }' +
                            startPercent + '%, 100% { opacity: 1; }' +
                        '}';

                        // 스타일 태그에 keyframe 추가
                        var style = document.getElementById('dynamic-keyframes');
                        if (!style) {
                            style = document.createElement('style');
                            style.id = 'dynamic-keyframes';
                            document.head.appendChild(style);
                        }
                        style.textContent += keyframes;

                        // 애니메이션 적용
                        spriteFrames[j].style.animation = animationName + ' 2.5s infinite';
                    }
                }

                modal.classList.add('show');
            };

            testImg.src = imgUrl;
        };
    }

    // 모달 배경 클릭시 닫기
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    };
}

