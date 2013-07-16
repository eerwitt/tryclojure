(ns tryclojure.views.tutorial
  (:require [noir.core :refer [defpartial defpage]]
            [hiccup.element :refer [javascript-tag link-to unordered-list]]
            [hiccup.page :refer [include-css include-js html5]]
            [tryclojure.views.template :refer [root-html]]))

(defpartial tutorial-nav []
  [:div.well.span3.tutorial-nav
    [:ul.nav.nav-list
      [:li.nav-header "Tutorials"]
      [:li [:a {:href "#tutorial_1" :title "Tutorial 1 - First Steps"} "Tutorial 1 - First Steps"]]
      [:li [:a {:href "#tutorial_2" :title "Tutorial 2 - Lists (LISPs)"} "Tutorial 2 - Lists (LISPs)"]]
      [:li [:a {:href "#tutorial_3" :title "Tutorial 3 - Type Coercion"} "Tutorial 3 - Type Coercion"]]
      [:li [:a {:href "#tutorial_4" :title "Tutorial 4 - Additional Arguments"} "Tutorial 4 - Additional Arguments"]]
      [:li [:a {:href "#tutorial_5" :title "Tutorial 5 - Define Functions"} "Tutorial 5 - Define Functions"]]
      [:li [:a {:href "#tutorial_6" :title "Tutorial 6 - Execute Functions"} "Tutorial 6 - Execute Functions"]]
      [:li [:a {:href "#tutorial_7" :title "Tutorial 7 - Anonymous Functions"} "Tutorial 7 - Anonymous Functions"]]
      [:li [:a {:href "#tutorial_8" :title "Tutorial 8 - Function Shorthand"} "Tutorial 8 - Function Shorthand"]]
      [:li [:a {:href "#tutorial_9" :title "Tutorial 9 - Extended Types (Immutability)"} "Tutorial 9 - Extended Types (Immutability)"]]
      [:li [:a {:href "#tutorial_10" :title "Tutorial 10 - Welcome to the Party!"} "Tutorial 10 - Welcome to the Party!"]]
    ]])

(defpartial tutorial-main []
  [:div.row-fluid
    (tutorial-nav)
    [:div.span9
      [:h2 "Tutorials"]
      [:p "These tutorials are designed to help you get started using Clojure."]]]

  [:div#tutorial_1.row-fluid
    [:div.span4
      [:h4 "Tutorial 1 - First Steps"]
      [:p "The first thing you may notice about Clojure is that common operations look... strange." ]
      [:p "For example, try adding two digits to equal 3." ] ]
    [:div.span4
      [:p "Most popular languages use "
        [:a {:href "http://en.wikipedia.org/wiki/Infix_notation"} "Infix Notation"]
        " like (1 + 2), in clojure the notation is prefixed. "
        "Try making the following code add up to 3."]
      [:div.code_container
        [:textarea.code {:data-result "#tutorial1-example1" :data-expected "3"} "(+ 1 4)"]]]
    [:div.span4.result_container
      [:pre#tutorial1-example1]
      [:p "That was a strange way to add numbers, wasn't it?"]]
  ]

  [:div#tutorial_2.row-fluid
    [:div.span4
      [:h4 "Tutorial 2 - Lists (LISPs)"]
      [:p "A Clojure program is made of lists." ]
      [:p "(+ 3 3) is a list that contains an operator, and then the operands." ] ]
    [:div.span4
      [:p "Try some extended arithmetic by dividing two numbers and have them equal 2."]
      [:div.code_container
        [:textarea.code {:data-result "#tutorial2-example1" :data-expected "2"} "(/ 15 5)"]]]
    [:div.span4.result_container
      [:pre#tutorial2-example1]]
  ]
)


(defpage "/tutorial" []
  (root-html tutorial-main "/resources/public/javascript/tutorial.js"))
