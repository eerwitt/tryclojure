(ns tryclojure.views.home
  (:require [noir.core :refer [defpartial defpage]]
            [hiccup.element :refer [javascript-tag link-to unordered-list]]
            [hiccup.page :refer [include-css include-js html5]]))

(defpartial links-html []
  [:h2 "Helpful Links"]
  (unordered-list {:class "unstyled"}
   [(link-to "http://clojure.org" "The official Clojure website")
    (link-to "http://clojure-doc.org/" "Clojure tutorials and documentation")
    (link-to "http://groups.google.com/group/clojure" "Clojure mailing list")
    (link-to "http://joyofclojure.com/" "The Joy of Clojure: a book by Michael Fogus and Chris Houser")
    (link-to "http://disclojure.org" "Disclojure")
    (link-to "http://planet.clojure.in" "Planet Clojure")]))

(defpartial about-html []
  [:h2 "About"]
  [:p
	 "An introduction to Clojure, not a generic Clojure REPL. "
	 "You won't be able to do everything in it that you could do in your local interpreter. "
  ]
  [:blockquote
    [:p "Clojure devs are liberals that want their programs to work."]
    [:small
      "Rich Hickey"
      [:cite
        (link-to "https://twitter.com/richhickey" "@richhickey")]]]
  [:p
   "TryClojure is written in Clojure and JavaScript with "
   (link-to "http://webnoir.org" "Noir") ", "
   (link-to "https://github.com/flatland/clojail" "clojail") ", and Chris Done's "
   " The design is by " (link-to "http://apgwoz.com" "Andrew Gwozdziewycz") "."
  ])

(defpartial main-html []
  [:div
    [:div.row-fluid
      [:div.container.span12
        [:div.code_container 
          [:textarea#code 
"(let
  [name \"Nobody\"]
  (format \"Hello world! By %s.\" name))"]]
      ]]
    [:div.row-fluid
      [:div.result_container.container.span12
        [:pre#result]]]
])

(defpartial tutorial-html []
  [:div
    [:div.row-fluid
      [:div.span6
        [:div.code_container
          [:textarea#code
"(let
  [x 123]
  (+ x 24))"]]]
      [:div.span6.result_container
        [:pre#result]]]
])

(defn root-html [content-html]
  (html5
   [:head
    [:meta {:charset "UTF-8"}]
    [:meta {:name "viewport" :content "width=device-width, initial-scale=1, maximum-scale=1"}]
    (include-css "/resources/public/bootstrap/css/bootstrap.min.css"
                "/resources/public/bootstrap/css/bootstrap-responsive.min.css"
                "/resources/public/css/tryclojure.css"
								"/resources/public/css/gh-fork-ribbon.css"
                "/resources/public/codemirror/codemirror.css")
    (include-js "/resources/public/javascript/jquery-1.10.1.min.js"
                "/resources/public/bootstrap/js/bootstrap.min.js"
                "/resources/public/javascript/tryclojure.js"
                "/resources/public/codemirror/codemirror.js"
                "/resources/public/codemirror/matchbrackets.js"
                "/resources/public/codemirror/closebrackets.js"
                "/resources/public/codemirror/clojure.js")
    [:title "Try Clojure"]]
   [:body
    [:div#wrapper.container
			[:div.github-fork-ribbon-wrapper.right
	     [:div.github-fork-ribbon
	       (link-to "https://github.com/eerwitt/tryclojure" "Fork me on GitHub")
				]
			]
     [:div#content.row-fluid
      [:div#header.span12
       [:h1
        [:span.logo-try "Try"] " "
        [:span.logo-clojure "Clo" [:em "j"] "ure"]]]]
     (content-html)
     [:div.row-fluid
      [:div.span1]
      [:div.span5 (about-html)]
      [:div.span5 (links-html)]]
      [:div.span1]

     [:div.footer.span12.text-center
      [:p "&copy; 2011-2012 Anthony Grimes and numerous contributors."]]
    ]
]))

(defpage "/" []
  (root-html main-html))

(defpage "/tutorial" []
  (root-html tutorial-html))
