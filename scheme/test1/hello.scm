; (define-syntax aif
;   (ir-macro-transformer
;     (lambda (form inject _)
;       (let ((_ (inject '_))
;             (test (cadr form))
;             (true (caddr form))
;             (false (cdddr form)))
;         (if (null? false)
;           `(let ((,_ ,test))
;             (if ,_ ,true))
;           `(let ((,_ ,test))
;             (if ,_ ,true ,(car false))))))))

; (define-syntax aif
;   (ir-macro-transformer
;     (lambda (form inject compare?)
;       (let ((_ (inject '_))
;             (test (cadr form))
;             (true (caddr form))
;             (false (cadddr form)))
;            `(let ((,_ ,test))
;                  (if ,_ ,true ,false))))))
;
; (print (aif (> 0 1) _ _))

; (define-syntax aif


; (begin-for-syntax
;   (struct exn:fail:syntax:<> exn:fail:syntax ())
;   (define default-<>
;     (lambda (stx)
;       (raise (exn:fail:syntax:<> "<>: Only allowed inside ~>:"
;                                  (current-continuation-marks)
;                                  (list stx))))))
; (define-syntax-parameter <> default-<>)
; (begin-for-syntax
;   (define (contains-<>? stx)
;     (with-handlers ([exn:fail:syntax:<>? (lambda (x) #t)]
;                     [(lambda (x) #t) (lambda (x) #f)])
;       (local-expand (with-syntax ([body stx])
;                       #'
;                         (syntax-parameterize
;                             ([<> default-<>])
;                           body))
;                     'expression empty)
;       #f)))
;
;
; (define-syntax (ensure-<> f)
;   (syntax-case f ()
;     ((_ e)
;      (if (contains-<>? #'e)
;        (syntax/loc f e)
;        (syntax/loc f (e <>))))))
;
; (define-syntax ->
;   (syntax-rules ()
;     ((_ x)
;       x)
;     ((_ x f etc ...)
;       (let ((y x))
;         (-> (syntax-parameterize
;               ((<> (make-rename-transformer #'y)))
;               (ensure-<> f))
;             etc ...)))))

; (define-syntax underscore
;   (ir-macro-transformer
;     (lambda (form inject compare?)
;       (let ((_ (inject '_))
;             (b (cadr form))
;             (x (caddr form)))
;         '(let ((,_ ,x))
;               ,b)))))
(define-syntax underscore
  (ir-macro-transformer
    (lambda (form inject compare?)
      (let ((_ (inject '_))
            (b (cadr form))
            (x (caddr form)))
        '(let ((,_ ,x))
              ,b)))))
(print (underscore (+ 2 _) 1))
(print (underscore (+ _ 2) 3))

; (define-syntax ->
;   (ir-macro-transformer
;     (lambda (form inject compare?)
;       (let ((x (cadr form))
;             (b (caddr form))
;             (r (cdddr form)))
;         '(-> (+ ,b ,x) ,r)))))
;
; (print (-> 3 5 6))

; (define-syntax ->
;   (ir-macro-transformer
;     (lambda (form inject compare?)
;       (let ((_ (inject '_))
;             (x (cadr form))
;             (f (caaddr form))
;             (args (cdaddr form))
;             (r (cdddr form)))
;         (if (null? r)
;           '(let ((,_ ,x))
;                 (f (cons ,_ args)))
;           '(let ((,_ ,x))
;                 (-> (f (cons ,_ args)) ,(cdr r))))))))



; (define k '(* 1 (+ 2 3) 4 5 6))
; (print k)
; (print (cadr k))
; (print (caaddr k))
; (print (cdaddr k))
; (print (cdddr k))


; (define-syntax ->
;   (syntax-rules ()
;     ((_ x) x)
;     ((_ x (f . args) next ...) (-> (f x . args) next ...))))
;
; (define-syntax =>
;   (syntax-rules ()
;     ((_ x) x)
;     ((_ x (f . args) next ...) (=> (f . (replace args x)) next ...))))

; (define-syntax =>
;   (syntax-rules ()
;     ((_ x) x)
;     ((_ x (f . args) next ...) (=> (f . (replace args 7 x)) next ...))))
