// ========================================
// 株式会社GM コーポレートサイト
// メインJavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニューのトグル
    initMobileMenu();
    
    // お問い合わせフォームの処理
    initContactForm();
    
    // スムーススクロール
    initSmoothScroll();
    
    // ページ読み込み時のアニメーション
    initAnimations();
});

// ========================================
// モバイルメニューの初期化
// ========================================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // ハンバーガーアイコンのアニメーション
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translateY(10px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-10px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // メニュー項目クリック時にメニューを閉じる
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = '';
                        span.style.opacity = '';
                    });
                }
            });
        });
    }
}

// ========================================
// お問い合わせフォームの初期化
// ========================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = {
                company: document.getElementById('company').value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                industry: document.getElementById('industry').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // バリデーション
            if (!validateForm(formData)) {
                return;
            }
            
            // 送信ボタンを無効化
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = '送信中...';
            
            // フォーム送信のシミュレーション（実際の実装ではサーバーに送信）
            setTimeout(function() {
                showMessage('success', 'お問い合わせありがとうございます。<br>担当者より1〜2営業日以内にご連絡させていただきます。');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = '送信する';
                
                // 実際の実装では、ここでメール送信やデータベース保存を行います
                console.log('フォームデータ:', formData);
            }, 1500);
        });
    }
}

// ========================================
// フォームバリデーション
// ========================================
function validateForm(formData) {
    // 必須項目のチェック
    if (!formData.company || !formData.name || !formData.email || !formData.industry || !formData.service || !formData.message) {
        showMessage('error', '必須項目をすべて入力してください。');
        return false;
    }
    
    // メールアドレスの形式チェック
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        showMessage('error', '正しいメールアドレスを入力してください。');
        return false;
    }
    
    return true;
}

// ========================================
// メッセージ表示
// ========================================
function showMessage(type, message) {
    const formMessage = document.getElementById('formMessage');
    
    if (formMessage) {
        formMessage.innerHTML = message;
        formMessage.style.display = 'block';
        
        if (type === 'success') {
            formMessage.style.backgroundColor = '#d1fae5';
            formMessage.style.color = '#065f46';
            formMessage.style.border = '1px solid #6ee7b7';
        } else if (type === 'error') {
            formMessage.style.backgroundColor = '#fee2e2';
            formMessage.style.color = '#991b1b';
            formMessage.style.border = '1px solid #fca5a5';
        }
        
        // メッセージを表示位置までスクロール
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // 成功メッセージは10秒後に自動で消す
        if (type === 'success') {
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 10000);
        }
    }
}

// ========================================
// スムーススクロール
// ========================================
function initSmoothScroll() {
    // ページ内リンク（#で始まるリンク）にスムーススクロールを適用
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // #のみの場合はページトップへ
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            // #で始まる要素へのスクロール
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// ページ読み込み時のアニメーション
// ========================================
function initAnimations() {
    // Intersection Observer APIを使用して、要素が画面に入ったときにアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を設定
    const animateElements = document.querySelectorAll('.service-card, .feature-item');
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// ========================================
// ウィンドウリサイズ時の処理
// ========================================
window.addEventListener('resize', function() {
    const navMenu = document.getElementById('navMenu');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    
    // デスクトップサイズになったらモバイルメニューを閉じる
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileMenuToggle) {
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }
});

// ========================================
// ユーティリティ関数
// ========================================

// メールアドレスのエンコード（スパム対策）
function encodeEmail(email) {
    return email.split('').map(char => {
        return '&#' + char.charCodeAt(0) + ';';
    }).join('');
}

// 現在のページのナビゲーションをハイライト
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath || (currentPath === '/' && linkPath.endsWith('index.html'))) {
            link.style.color = 'var(--secondary-color)';
            link.style.fontWeight = '600';
        }
    });
}

// ページ読み込み完了後に実行
window.addEventListener('load', function() {
    highlightCurrentPage();
});
