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
    ]])

(defpartial tutorial-main []
  [:div.row-fluid
    (tutorial-nav)
    [:div.span9
      [:h2 "Tutorials"]
      [:p "These tutorials are designed to help you get started using Clojure."]]]
  [:div.row-fluid
    [:div.span4
      [:div.code_container
        [:textarea.code {:data-result "#tutorial1-example1" :data-expected "3"} "(+ 1 2)"]]]
    [:div.span4.result_container
      [:pre#tutorial1-example1]]
  ]
)


(defpage "/tutorial" []
  (root-html tutorial-main "/resources/public/javascript/tutorial.js"))
